class DocLinks < Bridgetown::Component
  def initialize(category:, resource:, link_classes: nil, list_classes: nil)
    @category = category
    @list_classes = list_classes
    @link_classes = link_classes
    @resource = resource
  end

  def collection
    sorted_collection.select { |doc| doc.data[:categories].include?(@category) }
  end
end
