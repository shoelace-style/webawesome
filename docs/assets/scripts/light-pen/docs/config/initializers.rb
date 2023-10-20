Bridgetown.configure do |config|
  config.url = ENV.fetch("URL", "https://konnorrogers.github.io")
  config.base_path = ENV.fetch("BASE_PATH", "/light-pen")
  config.base_url = config.url + config.base_path
  init :"bridgetown-quick-search"

  # init :ssr
  # init :"bridgetown-routes"
  # only :server do
  #   roda do |app|
  #     app.plugin :default_headers,
  #       'Content-Type'=>'text/html',
  #       'Strict-Transport-Security'=>'max-age=16070400;',
  #       'X-Content-Type-Options'=>'nosniff',
  #       'X-Frame-Options'=>'deny',
  #       'X-XSS-Protection'=>'1; mode=block',
  #       'Access-Control-Allow-Origin'=>'*'
  #   end
  # end
end
