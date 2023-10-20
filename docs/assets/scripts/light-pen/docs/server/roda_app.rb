# Roda is a simple Rack-based framework with a flexible architecture based
# on the concept of a routing tree. Bridgetown uses it for its development
# server, but you can also run it in production for fast, dynamic applications.
#
# Learn more at: http://roda.jeremyevans.net

class RodaApp < Roda
  # Add additional Roda configuration here if needed
  plugin :bridgetown_server

  # Uncomment to use Bridgetown SSR:
  # plugin :bridgetown_ssr

  # Uncomment to use file-based dynamic routing in your project (make sure you
  # uncomment the gem dependency in your `Gemfile` as well):
  # plugin :bridgetown_routes

  # plugin :default_headers,
  #   {
  #     'Content-Type'=>'text/html',
  #     'Strict-Transport-Security'=>'max-age=16070400;',
  #     'X-Content-Type-Options'=>'nosniff',
  #     'X-Frame-Options'=>'deny',
  #     'X-XSS-Protection'=>'1; mode=block',
  #     'Access-Control-Allow-Origin'=>"*"
  #   }
  #
  route do |r|
    # Load Roda routes in server/routes (and src/_routes via `bridgetown-routes`)
    r.bridgetown
  end
end
