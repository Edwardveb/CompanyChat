namespace Extensions
{
    public static class ObjectExtensions
    {
        public static string MyToStringTrim(this object o) => o.MyToString().Trim();

        public static string MyToString(this object o) => o == null ? string.Empty : o.ToString();

        public static string MyToStringLower(this object o) => o.MyToString().ToLower();

        public static string MyToStringUpper(this object o) => o.MyToString().ToUpper();

        public static string MyToStringTrimLower(this object o) => o.MyToStringTrim().ToLower();

        public static string MyToStringTrimUpper(this object o) => o.MyToStringTrim().ToUpper();
    }
}