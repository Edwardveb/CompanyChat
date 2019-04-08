using System;
using Microsoft.Extensions.Logging;

namespace WebApi.Helpers
{
    public class DbLoggingService : ILoggerProvider
    {
        public ILogger CreateLogger(string categoryName)
        {
            return new Logger(categoryName);
        }

        public void Dispose()
        {
        }

        private class Logger : ILogger
        {
            private readonly string _categoryName;

            public Logger(string categoryName)
            {
                _categoryName = categoryName;
            }

            public bool IsEnabled(LogLevel logLevel)
            {
                return true;
            }

            public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
            {
                //[REDACTED]
                //Custom ILogger implementation
                //Save logs to the database
            }

            public IDisposable BeginScope<TState>(TState state)
            {
                return new NoopDisposable();
            }

            private class NoopDisposable : IDisposable
            {
                public void Dispose()
                {
                    //[REDACTED]
                }
            }
        }
    }
}