require "securerandom"

class Syntax < Bridgetown::Component
  def self.full_language(language)
    return "" if language.nil?

    Rouge::Lexer.find(language).title || language.titleize
  end

  attr_accessor :language, :filename

  def initialize(language = "markup", filename = nil)
    super()
    @language = language
    @filename = filename
  end

  def filename_or_language
    filename || full_language
  end

  def full_language
    Syntax.full_language(@language)
  end

  def id
    @id ||= "syntax-#{SecureRandom.uuid}"
  end
end

