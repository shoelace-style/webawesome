require "cgi"
require "custom_elements_manifest_parser"

class Builders::ComponentGenerator < SiteBuilder
  def build
    generator do
      custom_elements_manifest_path = File.read(File.expand_path("../../../custom-elements.json", __dir__))
      manifest = JSON.parse(custom_elements_manifest_path)

      # @return [::CustomElementsManifestParser::Parser]
      parser = ::CustomElementsManifestParser.parse(manifest)
      elements = parser.find_all_tag_names

      resources = site.collections.documentation.resources

      resources.each do |resource|
        component_name = File.basename(resource.relative_path.basename, ".md").to_s

        metadata = elements[component_name]
        next if metadata.nil?

        resource.data.merge!({
          "description" => metadata.description
        })

        slots = metadata.slots
        attributes = metadata.members.select { |member| member.attributes[:attribute] }
        events = metadata.events

        # Use functions instead of methods so we don't clobber built-in #methods method.
        functions = metadata.members.select { |member| member.kind == "method" }

        parts = metadata.cssParts

        resource.content += [
          slots_table(slots).html_safe,
          attributes_table(attributes).html_safe,
          events_table(events).html_safe,
          functions_table(functions).html_safe,
          parts_table(parts).html_safe
        ].join("\n\n")
      end
    end
  end

  def escape(html)
    CGI.escape_html(html || "")
  end

  def slots_table(slots)
    return "" if slots.nil? || slots.empty?

    tbody = slots.map do |slot|
      <<~HTML
        <tr>
          <td>
            <code>#{slot.name}</code>
          </td>
          <td>
            #{slot.description.to_s.empty? ? "-" : escape(slot.description)}
          </td>
        </tr>
      HTML
    end.join("\n")

    <<~HTML
      ## Slots

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            #{tbody}
          </tbody>
        </table>
      </div>
    HTML
  end

  def attributes_table(members)
    return "" if members.nil? || members.empty?

    tbody = members.map do |member|
      type_text = ""

      type_text = member.type.text if member.type && member.type.text

      <<~HTML
        <tr>
          <td>
            <% if "#{member.attribute}" != "#{member.name}" %>
              <small>[Attribute]</small>
              <br>
              <code>#{member.attribute}</code>
              <br><br>
              <small>[Property]</small>
              <br>
              <code>#{member.name}</code>
            <% elsif not("#{member.attribute}".blank?) %>
              <small>[Attribute + Property]</small>
              <br>
              <code>#{member.attribute}</code>
            <% else %>
              <small>[Property Only]</small>
              <br>
              <code>#{member.name}</code>
            <% end %>
          </td>
          <td>
            #{member.description.to_s.empty? ? "-" : escape(member.description)}
          </td>
          <td>
            #{member.reflects ? "<sl-icon name='check-lg'></sl-icon>" : "-"}
          </td>
          <td>
            #{type_text.blank? ? "-" : "<code>#{escape(type_text)}</code>"}
          </td>
          <td>
            #{member.default.nil? ? "-" : "<code>#{escape(member.default)}</code>"}
          </td>
        </tr>
      HTML
    end.join("\n")

    <<~HTML
      ## Attributes

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Reflects</th>
              <th>Type</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            #{tbody}
          </tbody>
        </table>
      </div>
    HTML
  end

  def events_table(events)
    return "" if events.nil? || events.empty?


    tbody = events.map do |event|
      <<~HTML
        <tr>
          <td>
            #{event.name}
          </td>
          <td>
          </td>
        </tr>
      HTML
    end

    <<~HTML
      ## Events

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            #{tbody}
          </tbody>
        </table>
      </div>
    HTML
  end

  def parameter_string(parameter)
    rest = parameter.rest ? "..." : ""
    # optional = parameter.optional ? "?" : ""
    type_text = ""
    type_text = ": " + parameter.type.text if parameter.type && parameter.type.text

    rest + parameter.name + type_text
  end

  def functions_table(functions)
    return "" if functions.nil? || functions.empty?

    tbody = functions.map do |function|
      parameters = "-"
      if not(function.parameters.to_s.empty?)
        parameters = "<code>" + escape(function.parameters.map { |parameter| parameter_string(parameter) }.join(", ")) + "</code>"
      end

      <<~HTML
        <tr>
          <td>
            <code>#{function.name}()</code>
          </td>
          <td>
            #{function.description.to_s.empty? ? "-" : escape(function.description.to_s)}
          </td>
          <td>
            #{parameters}
          </td>
        </tr>
      HTML
    end.join("\n")

    <<~HTML
      ## Functions

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Parameters</th>
            </tr>
          </thead>
          <tbody>
            #{tbody}
          </tbody>
        </table>
      </div>
    HTML
  end

  def parts_table(parts)
    return "" if parts.nil? || parts.empty?

    tbody = parts.map do |part|
      <<~HTML
        <tr>
          <td>
            <code>#{part.name}</code>
          </td>
          <td>
            #{part.description.to_s.empty? ? "-" : escape(part.description)}
          </td>
        </tr>
      HTML
    end.join("\n")

    <<~HTML
      ## Parts

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            #{tbody}
          </tbody>
        </table>
      </div>
    HTML
  end

end
