object Helpers {
  def pp(value: Any): String = value match {
    case arr: Array[_] => "[" + arr.map(pp).mkString(", ") + "]"
    case other => other.toString
  }
}
