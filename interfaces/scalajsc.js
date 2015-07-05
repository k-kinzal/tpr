type ScalajscOption = {
  definitions?:        {[key: string]: string},
  flags?:              Array<string>,
  plugins?:            {[key: string]: string},
  advancedOptions?:    Array<string>,
  bootclasspath?:      string,
  classpath?:          string,
  destination:         string,
  dependencyfile?:     string,
  deprecation?:        boolean,
  encoding?:           string,
  explaintypes?:       boolean,
  extdirs?:            string,
  feature?:            boolean,
  generatedDebbuging?: string,
  javabootclasspath?:  string,
  javaextdirs?:        string,
  language?:           string,
  noSpecialization?:   boolean,
  nobootcp?:           boolean,
  nowarn?:             boolean,
  optimise?:           boolean,
  sourcepath?:         string,
  target?:             string,
  toolcp?:             string,
  unchecked?:          boolean,
  uniqid?:             boolean,
  usejavacp?:          boolean,
  usemanifestcp?:      boolean,
  verbose?:            boolean
};

type ScalajscHelp = {
  usage: string,
  options: Array<{
    option: string,
    description: string,
  }>,
  _raw: string
};