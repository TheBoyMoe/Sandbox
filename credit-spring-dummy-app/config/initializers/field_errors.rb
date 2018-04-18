ActionView::Base.field_error_proc = proc do |html_tag, instance|
  message = Array(instance.error_message).join('. ')

  field = if html_tag =~ /class="checkbox"/ || ((html_tag !~ /type="checkbox"/) && (html_tag !~ /label/))
            <<~HTML
              <div class="has-error">
                #{html_tag}
                <div class="text-danger font-size-sm text-right">#{message}</div>
              </div>
            HTML
          else
            %(<div class="has-error">#{html_tag}</div>)
          end

  field.html_safe
end
