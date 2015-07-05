import scala.annotation.tailrec
import scala.scalajs.js
import js.annotation.JSExport

sealed trait MyList[+A] { self =>

  @JSExport
  def head: A

  @JSExport
  def isEmpty: Boolean

  @JSExport
  def length: Int =
    foldLeft(0)((acc, _) => acc + 1)

  @JSExport
  final def foldLeft[B](z: B)(f: (B, A) => B): B = this match {
    case MyNil => z
    case MyCons(x, xs) => xs.foldLeft(f(z, x))(f)
  }

  @JSExport
  def foldRight[B](z: B)(f: (A, B) => B): B =
    foldLeft((b: B) => b)((g, a) => b => g(f(a, b)))(z)

  @JSExport
  def reduceLeft[B >: A] (f: (B, A) => B): B =
    this match {
      case MyNil =>
        throw new UnsupportedOperationException
      case MyCons(x, xs) =>
        xs.foldLeft(x.asInstanceOf[B])(f)
    }

  @JSExport
  def reduceRight[B >: A](f: (A, B) => B): B =
    this match {
      case MyNil =>
        throw new UnsupportedOperationException
      case MyCons(x, xs) =>
        xs.foldRight(x.asInstanceOf[B])(f)
    }

  @JSExport
  def reduce[B >: A](f: (B, B) => B): B = reduceLeft(f)

  @JSExport
  def max[B >: A](implicit cmp: Ordering[B]): A =
    reduceLeft((x, y) => if (cmp.gteq(x, y)) x else y)

  @JSExport
  def min[B >: A](implicit cmp: Ordering[B]): A =
    reduceLeft((x, y) => if (cmp.lteq(x, y)) x else y)

  @JSExport
  final def exists(p: A => Boolean): Boolean = this match {
    case MyNil => false
    case MyCons(x, xs) if p(x) => true
    case MyCons(_, xs) => xs.exists(p)
  }

  @JSExport
  def ::[B >: A](b: B): MyList[B] =
    MyCons(b, this)

  @JSExport
  def reverse: MyList[A] =
    foldLeft(MyList[A]())((acc, h) => h :: acc)

  @JSExport
  def ++[B >: A](b: MyList[B]): MyList[B] =
    foldRight(b)(_ :: _)

  @JSExport
  def map[B](f: A => B): MyList[B] =
    foldRight(MyList[B]())((x, xs) => f(x) :: xs)

  @JSExport
  def flatMap[B](f: A => MyList[B]): MyList[B] =
    foldRight(MyList[B]())(f(_) ++ _)

  @JSExport
  final def find(f: A => Boolean): Option[A] = this match {
    case MyNil => None
    case MyCons(x, xs) if f(x) => Some(x)
    case MyCons(_, xs) => xs.find(f)
  }

  @JSExport
  def startsWith[B >: A](prefix: MyList[B]): Boolean = {

    @tailrec
    def loop(a: MyList[A], b: MyList[B]): Boolean = {
      (a, b) match {
        case (MyCons(x1, xs1), MyCons(x2, xs2)) => (x1 == x2) && loop(xs1, xs2)
        case (MyCons(_, _), MyNil) => true
        case (MyNil, MyCons(_, _)) => false
        case (MyNil, MyNil) => true
      }
    }
    loop(this, prefix)
  }

  @JSExport
  def startsWith2[B >: A](prefix: MyList[B]): Boolean =
    if (length < prefix.length) false else zip(prefix).forall { case (l, r) => l == r }

  @JSExport
  def zip[B](other: MyList[B]): MyList[(A, B)] = {
    @tailrec
    def loop(self: MyList[A], other: MyList[B], result: MyList[(A, B)]): MyList[(A, B)] =
      (self, other) match {
        case (MyCons(lh, lt), MyCons(rh, rt)) => loop(lt, rt, MyCons((lh,rh), result))
        case _ => result
      }

    loop(this.reverse, other.reverse, MyNil)
  }

  @JSExport
  def filter(p: A => Boolean): MyList[A] =
    foldRight(MyList[A]())((a, acc) => if (p(a)) a :: acc else acc)

  sealed class WithFilter(p: A => Boolean) {

    def map[B](f: A => B): MyList[B] =
      foldRight(MyList[B]())((a, acc) => if (p(a)) f(a) :: acc else acc)

    def flatMap[B](f: A => MyList[B]): MyList[B] =
      foldRight(MyList[B]())((a, acc) => if (p(a)) f(a) ++ acc else acc)

    def withFilter(q: A => Boolean): WithFilter =
      WithFilter(q)
  }

  object WithFilter {
    def apply(p: A => Boolean): WithFilter =
      new WithFilter(p)
  }

  @JSExport
  def withFilter(p: A => Boolean): WithFilter =
    new WithFilter(p)

  @JSExport
  def forall(p: A => Boolean): Boolean =
    foldLeft(true)(_ && p(_))

  @JSExport
  def toIndexSeq: IndexedSeq[A] =
    foldLeft(IndexedSeq.empty[A])(_.+:(_))

  @JSExport
  def headOption: Option[A] = this match {
    case MyNil => None
    case MyCons(x, _) => Some(x)
  }

  @JSExport
  def lastOption: Option[A] =
    reverse.headOption

  @JSExport
  def mkString(start: String, separator: String, end: String): String =
    foldLeft(start)((acc, a) => acc ++ separator ++ a.toString) ++ end

  def mkString(separator: String): String =
    mkString("", separator, "")

  def mkString: String =
    mkString("")

}

@JSExport
case object MyNil extends MyList[Nothing] {

  @JSExport
  def head = throw new NoSuchElementException

  @JSExport
  def isEmpty: Boolean = true

}

@JSExport
case class MyCons[+A](head: A, tail: MyList[A]) extends MyList[A] {

  @JSExport
  def isEmpty: Boolean = false

}

@JSExport
object MyList {

  @JSExport
  def empty[A]: MyList[A] = MyNil

  @JSExport
  def apply[A](as: A*): MyList[A] =
    as.foldRight(empty[A])(MyCons(_, _))

  @JSExport
  def fill[A](n: Int)(element: => A): MyList[A] =
    if (n < 0) MyNil else apply(Seq.fill(n)(element): _*)

}