# This file is used by Rack-based servers during the Bridgetown boot process.

require "bridgetown-core/rack/boot"

Bridgetown::Rack.boot

require "rack/cors"

use Rack::Cors do
  allow do
    origins '*'
    resource '/*', headers: :any, methods: :get
  end
end

run RodaApp.freeze.app # see server/roda_app.rb
