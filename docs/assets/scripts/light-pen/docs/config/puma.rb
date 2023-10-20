# Puma is a fast, concurrent web server for Ruby & Rack
#
# Learn more at: https://puma.io
#
port ENV.fetch("BRIDGETOWN_PORT") { 4000 }

# You can adjust the number of workers (separate processes) and threads
# (per process) based on your production system
#
if ENV["BRIDGETOWN_ENV"] == "production"
  workers ENV.fetch("BRIDGETOWN_CONCURRENCY") { 4 }
end

max_threads_count = ENV.fetch("BRIDGETOWN_MAX_THREADS") { 5 }
min_threads_count = ENV.fetch("BRIDGETOWN_MIN_THREADS") { max_threads_count }
threads min_threads_count, max_threads_count

# Preload the application for maximum performance
#
preload_app!

# Use the Bridgetown logger format
#
require "bridgetown-core/rack/logger"
log_formatter do |msg|
  Bridgetown::Rack::Logger.message_with_prefix msg
end
