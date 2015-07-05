type ScalajsOption = {
  output?:                 string,
  jsoutput?:               string,
  fastOpt?:                boolean,
  noOpt?:                  boolean,
  fullOpt?:                boolean,
  prettyPrint?:            boolean,
  compliantAsInstanceOfs?: boolean,
  outputMode?:             string,
  bypassLinkingErrors?:    boolean,
  checkIR?:                boolean,
  relativizeSourceMap?:    string,
  noStdlib?:               boolean,
  debug?:                  boolean,
  quiet?:                  boolean,
  reallyQuiet?:            boolean
};