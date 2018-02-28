def url_for_title(options)
	controller = options[:controller]
	eval("#{controller.capitalize.singularize}.find_by_title('#{options[:title]}').url_for_me(options[:action].downcase)")
end

def path_to(page_name, id = '')
	name = page_name.downcase
	case name
		when 'home' then
			root_path
		when 'about' then
			'/about-us'
		when 'registration' then
			new_user_registration_path
		when 'edit registration' then
			edit_user_registration_path
		when 'sign in' then
			new_user_session_path
		when 'projects' then
			projects_path
		when 'new project' then
			new_project_path
		when 'articles' then
			articles_path
		when 'articles with ruby tag' then
			articles_path(tag: 'Ruby')
		when 'edit' then
			edit_project_path(id)
		when 'show' then
			project_path(id)
		when 'our members' then
			users_path
		when 'user profile' then
			user_path(id)
		when 'my account' then
			edit_user_registration_path(id)
		when 'scrums' then
			scrums_index_path
		when 'event_instances' then
			hangouts_path
		when 'foobar' then
			"/#{page}"
		when 'password reset' then
			edit_user_password_path(id)
		when 'hookups' then
			hookups_path
		when 'dashboard' then
			'/dashboard'
		when 'premium membership' then
			static_page_path('premium')
		when 'premium mob membership' then
			static_page_path('premium_mob')
		when 'getting started' then
			static_page_path('getting-started')
		when 'new newsletter' then
			new_newsletter_path
		when 'newsletters index' then
			newsletters_path
		when 'sign up' then
			new_user_registration_path
		when 'premium sign up' then
			new_subscription_path(plan: 'premium')
		when 'premium mob sign up' then
			new_subscription_path(plan: 'premiummob')
		else
			raise('path to specified is not listed in #path_to')
	end
end

# GIVEN steps


Then(/^show me the page$/) do
	save_and_open_page
end

Given(/^I (?:visit|am on) the site$/) do
	visit root_path
end

Given(/^I visit "(.*?)"$/) do |path|
	visit path
end

# WHEN steps
When(/^I (?:go to|am on) the "([^"]*)" page$/) do |page|
	visit path_to(page)
end

When(/^(?:when I|I) click "([^"]*)"$/) do |text|
	click_link_or_button(text)
end

When(/^(?:when I|I) click the first instance of "([^"]*)"$/) do |text|
	click_link_or_button(text, match: :first)
end

When(/^I click the "([^"]*)" button$/) do |button|
	click_link_or_button button
end

When(/^I open the Edit URL controls/) do
	page.execute_script(  %q{$('li[role="edit_hoa_link"] > a').trigger('click')}  )
end

When(/^I click on the Save button/) do
	page.find(:css, %q{input[id="hoa_link_save"]}).trigger('click')
end

When(/^I click on the Cancel button/) do
	page.find(:css, %q{button[id="hoa_link_cancel"]}).trigger('click')
end

Then(/^I should see the Edit URL controls/) do
	expect(page).to have_css 'div#edit-link-form.collapse.in'
end

Then(/^I should not see the Edit URL controls/) do
	expect(page).to have_css 'div#edit-link-form[style*="height: 0px"]'
end

When(/^I click "([^"]*)" button$/) do |button|
	click_button button
end

When(/^I click the "([^"]*)" link$/) do |button|
	click_link button
end

When(/^I follow "([^"]*)"$/) do |text|
	click_link text
end

When(/^I dropdown the "([^"]*)" menu$/) do |text|
	within ('.navbar') do
		click_link text
	end

end


When(/^I fill in "([^"]*)" with "([^"]*)"$/) do |field, value|
	fill_in field, :with => value
end

When /^I fill in(?: "([^"]*)")?:$/ do |name, table|
	with_scope(name) do
		table.rows.each do |row|
			fill_in row[0], with: row[1]
		end
	end
end

When /^I fill in event field(?: "([^"]*)")?:$/ do |name, table|
	with_scope(name) do
		table.rows.each do |row|
			within('form#event-form') do
				fill_in row[0], with: row[1]
			end
		end
	end
end

Given /^the time now is "([^"]*)"$/ do |time|
	# use delorean
	Time.stub(now: Time.parse(time))
end

# THEN steps

Then /^I should see link "([^"]*)" with "([^"]*)"$/ do |link, url|
	expect(page).to have_link(link, href: url)
end

Then(/^I should not see a link "([^"]*)" to "([^"]*)"$/) do |link, url|
	expect(page).to_not have_link(link, href: url)
end

Then /^I should be on the "([^"]*)" page$/ do |page|
	expect(current_fullpath).to eq path_to(page)
end

def current_fullpath
	URI.parse(current_url).request_uri
end

Then /^I should see a form(?: "([^"]*)")? with:$/ do |name, table|
	with_scope(name) do
		table.rows.each do |row|
			step %Q{the "#{row[0]}" field should contain "#{row[1]}"}
		end
	end
end

Then /^I should( not)? see:$/ do |negative, table|
	expectation = negative ? :should_not : :should
	table.rows.flatten.each do |string|
		page.send(expectation, have_text(string))
	end
end

Then /^I should( not)? see "([^"]*)"$/ do |negative, string|
	unless negative
		expect(page).to have_text string
	else
		expect(page).to_not have_text string
	end
end

Then /^I should( not)? see a (notice|success) flash "([^"]*)"$/ do |negative, type, string|
	unless negative
		expect(page).to have_css '.alert', text: string
		expect(page).to have_css ".alert-#{type}", text: string
	else
		expect(page).not_to have_css '.alert', text: string
		expect(page).not_to have_css ".alert-#{type}", text: string
	end
end

Then /^I should( not)? see "([^"]*)" in "([^"]*)"$/ do |negative, string, scope|
	within(selector_for(scope)) { step %Q{I should#{negative} see "#{string}"} }
end

Then /^I should( not)? see link "([^"]*)"$/ do |negative, link|
	if negative
		expect(page.has_link? link).to be_falsey
	else
		expect(page.has_link? link).to be_truthy
	end
end

Then /^I should( not)? see button "([^"]*)"$/ do |negative, button|
	unless negative
		expect(page.has_link_or_button? button).to be_truthy
	else
		expect(page.has_link_or_button? button).to be_falsey
	end
end

Then /^the "([^"]*)" field(?: within (.*))? should( not)? contain "([^"]*)"$/ do |field, parent, negative, value|
	with_scope(parent) do
		field = find_field(field)
		field_value = (field.tag_name == 'textarea') ? field.text : field.value
		field_value ||= ''
		unless negative
			expect(field_value).to match(/#{value}/)
		else
			expect(field_value).to_not match(/#{value}/)
		end
	end
end

Then(/^I should be on the "([^"]*)" page for ([^"]*) "([^"]*)"/) do |action, controller, title|
	expect(current_path).to eq url_for_title(action: action, controller: controller, title: title)
end

Given(/^I (?:am on|go to) the "([^"]*)" page for ([^"]*) "([^"]*)"$/) do |action, controller, title|
	visit url_for_title(action: action, controller: controller, title: title)
end

Then(/^I should( not be able to)? see a link to "([^"]*)" page for ([^"]*) "([^"]*)"$/) do |invisible, action, controller, title|
	if invisible
		expect(page).not_to have_link(title, href: url_for_title(action: action, controller: controller, title: title))
	else
		expect(page).to have_link(title, href: url_for_title(action: action, controller: controller, title: title))
	end
end

When(/^I select "([^"]*)" to "([^"]*)"$/) do |field, option|
	find(:select, field).find(:option, option).select_option
end

Then(/^I should see the sidebar$/) do
	page.find(:css, '#sidebar')
end

Then(/^I should( not)? see the supporter content/) do |negative|
	unless negative
		expect(page).to have_css 'div#sponsorsBar', visible: true
	else
		expect(page).to_not have_css '#sponsorsBar'
	end
end

Then(/^I should( not)? see the round banners/) do |negative|
	unless negative
		expect(page).to have_css '.circle', visible: true
	else
		expect(page).to_not have_css '.circle'
	end
end

When(/^I click the very stylish "([^"]*)" button$/) do |button|
	find(:css, %Q{a[title="#{button.downcase}"]}).click()
end

Then(/^I should (not |)see the very stylish "([^"]*)" button$/) do |should, button|
	if should == 'not '
		expect(page).to_not have_css %Q{a[title="#{button.downcase}"]}
	else
		expect(page).to have_css %Q{a[title="#{button.downcase}"]}
	end
end

Then(/^I should see the sub-documents in this order:$/) do |table|
	expected_order = table.raw.flatten
	actual_order = page.all('li.listings-item a').collect(&:text)
	expect(actual_order).to eq expected_order
end

Then /^I should see a "([^"]*)" table with:$/ do |name, table|
	expect(page).to have_text(name)
	table.rows.flatten.each do |heading|
		expect(page).to have_css('table th', :text => heading)
	end
end

Then(/^I should see (\d+) rows with text "(.*?)" in a table$/) do |count, text|
	expect(page).to have_css('table tr', text: text, count: count)
end

Then(/^I check "([^"]*)"$/) do |item|
	check item
end

Then(/^I check by value "([^"]*)"$/) do |value|
	find(:css, "input[value='#{value}']").set(true)
end

When(/^I refresh the page$/) do
	visit current_url
end

def assert_link_exists path, text
	expect(page).to have_css "a[href='#{path}']", text: text
end
Then(/^I should see a link to create a new event$/) do
	assert_link_exists(new_event_path, "Create event")
end

Then(/^I should see a link to upcoming events$/) do
	assert_link_exists(events_path, "Upcoming events")
end

Then(/^I should see a link to past scrums$/) do
	assert_link_exists(scrums_path, "Past scrums")
end

Then(/^I should see a link to past events$/) do
	assert_link_exists(hangouts_path, "Past events")
end


Then(/^I should see a link "([^"]*)" to "([^"]*)"$/) do |text, link|
	expect(page).to have_css "a[href='#{link}']", text: text
end

Then(/^I should see an image with source "([^"]*)"$/) do |source|
	expect(page).to have_css "img[src*=\"#{source}\"]"
end

Then(/^I should see the "(.*)" icon$/) do |provider|
	expect(page).to have_css ".fa-#{provider}"
end

Then(/^I should see an video with source "([^"]*)"$/) do |source|
	expect(page).to have_css "iframe[src*=\"#{source}\"]"
end

Then /^I should( not)? see "([^"]*)" in table "([^"]*)"$/ do |negative, title, table_name|
	within ("table##{table_name}") do
		if negative
			expect(page.body).not_to have_content(/#{title}/m)
		else
			expect(page.body).to have_content(/#{title}/m)
		end
	end
end

Given(/^I am on a (.*)/) do |device|
	case device
		when 'desktop'
			agent = 'Poltergeist'
		when 'tablet'
			agent = 'Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10'
		when 'smartphone'
			agent = 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/6531.22.7'
		else
			pending
	end
	page.driver.headers = { 'User-Agent' => agent }
end


And(/^I debug$/) do
	byebug
end

And(/^I remote debug/) do
	page.driver.debug
end


And(/^the window size is wide$/) do
	Capybara.page.current_window.resize_to(1300,400)
end

When /^I search for "(.*?)"$/ do |text|
	fill_in 'q', with: text
	click_button 'Submit'
end


Then(/^I should see "([^"]*)" page before "([^"]*)"$/) do |first_item, second_item|
	page.body.should =~ /#{first_item}.*#{second_item}/m
end


Then /^the organisation results should( not)? contain:$/ do |negative, table|
	expectation = negative ? :should_not : :should
	table.raw.flatten.each do |cell|
		within('#orgs_scroll') do
			page.send(expectation, have_text(cell))
		end
	end
end


Then /^I should( not)? see:$/ do |negative, table|
	expectation = negative ? :should_not : :should
	table.rows.flatten.each do |string|
		page.send(expectation, have_text(string))
	end
end

Then /^the index should( not)? contain:$/ do |negative, table|
	expectation = negative ? :should_not : :should
	table.raw.flatten.each do |cell|
		within('#column2') do
			page.send(expectation, have_text(cell))
		end
	end
end

Then(/^I should see "(.*?)" < (.*?) >$/) do |text, tag|
	tags = {'emphasized' => 'em', 'stronged' => 'strong', 'number listed' => 'ol', 'bullet listed' => 'ul'}
	collect_tag_contents(page.body, tags[tag]).should include(text)
end

Then(/^I should see "(.*?)" < tagged > with "(.*?)"$/) do |text, tag|
	page.should have_css(tag, text: text)
	#collect_tag_contents(page.body, tag).should include(text)
end

Then(/^I should see "(.*?)" < linked > to "(.*?)"$/) do |text, url|
	links = collect_links(page.body)
	links[text].should == url
end

Then(/^I should see a mail-link to "([^"]*)"$/) do |email|
	page.should have_css("a[href='mailto:#{email}']")
end


When(/^the URL should contain "(.*?)"$/) do |string|
	URI.parse(current_url).path.should == '/' + string
end



When /^I fill in "(.*?)" with "(.*?)" within the navbar$/ do |field, value|
	within('#navbar') { fill_in(field, with: value) }
end

When /^I fill in "(.*?)" with "(.*?)" within the main body$/ do |field, value|
	within('#main') { fill_in(field, with: value) }
end

Given /^I create "(.*?)" org$/ do |name|
	page.driver.submit :post, '/organisations', organisation: {name: name}
end

Then /^"(.*?)" org should not exist$/ do |name|
	expect(Organisation.find_by_name name).to be_nil
end

Then(/^"(.*?)" should have email "(.*?)"$/) do |org, email|
	Organisation.find_by_name(org).email.should eq email
end


Then(/^I should( not)? see a link or button "(.*?)"$/) do |negate, link|
	expectation_method = negate ? :not_to : :to
	expect(page).send(expectation_method, have_selector(:link_or_button, link))
end

Then(/^the navbar should( not)? have a link to (.*?)$/) do |negate, link|
	expectation_method = negate ? :not_to : :to
	within('#navbar') { expect(page).send(expectation_method, have_selector(:link_or_button, link)) }
end

Then(/^I should not see "(.*?)"  within "(.*?)"$/) do |text, selector|
	within('.' + selector) { expect(page).not_to have_content text}
end


Then /^I should see "([^"]*)" and "([^"]*)"$/ do |text1, text2|
	expect(page).to have_content text1
	expect(page).to have_content text2
end

Then /^I should( not)? see "([^"]*)"$/ do |negate, text|
	expectation_method = negate ? :not_to : :to
	expect(page).send(expectation_method, have_content(text))
end

Then /^I should see (a|an) (error|warning|notice|success) flash: "([^"]*)"$/ do |_, flash_type, text|
	expect(find("#flash_#{flash_type}")).to have_content(text)
end

Then(/^I should see "(.*?)" within "(.*?)"$/) do |text, selector|
	within('#' + selector) { expect(page).to have_content text}
end

Then(/^I should not see "(.*?)" within "(.*?)"$/) do |text, selector|
	within('#' + selector) { expect(page).not_to have_content text}
end

Then(/^I should see the following:$/) do |table|
	table.rows.each do |text|
		expect(page).to have_content text.first
	end
end

Then /^I should( not)? see a link with text "([^"]*?)"$/ do |negate, link|
	if negate
		page.should_not have_link link
	else
		page.should have_link link
	end
end

Then /^I should( not)? see a new organisations link/ do |negate|
	#page.should_not have_link "New Organisation", :href => new_organisation_path
	#page.should_not have_selector('a').with_attribute href: new_organisation_path
	expectation_method = negate ? :not_to : :to
	expect(page).send(expectation_method, have_xpath("//a[@href='#{new_organisation_path}']"))
end

Then /^I should see "([^"]*)", "([^"]*)" and "([^"]*)"$/ do |text1, text2, text3|
	expect(page).to have_content text1
	expect(page).to have_content text2
	expect(page).to have_content text3
end

Then /^I should not see any address or telephone information for "([^"]*?)"$/ do |name1|
	org1 = Organisation.find_by_name(name1)
	page.should_not have_content org1.telephone
	page.should_not have_content org1.address
end

Given /^I edit the donation url to be "(.*?)"$/ do |url|
	fill_in('organisation_donation_info', with: url)
end

Then /^I should not see any edit or delete links$/ do
	page.should_not have_link "Edit"
	page.should_not have_link "Destroy"
end

Then /^I should not see any edit link for "([^"]*?)"$/ do |name1|
	page.should_not have_link "Edit"
end

Then /^I should see the external website link for "(.*?)" charity$/ do |org_name|
	org = Organisation.find_by_name org_name
	page.should have_xpath %Q<//a[@target = "_blank" and @href = "#{org.website}" and contains(.,'#{org.website}')]>
end

And /^the search box should contain "(.*?)"$/ do |arg1|
	expect(page).to have_xpath("//input[@id='q' and @value='#{arg1}']")
end

Then /^I should( not)? see the no results message$/ do |negate|
	expectation_method = negate ? :not_to : :to
	expect(page).send(expectation_method, have_content(SEARCH_NOT_FOUND))
end

Then /^I should not see any address or telephone information for "([^"]*?)" and "([^"]*?)"$/ do |name1, name2|
	org1 = Organisation.find_by_name(name1)
	org2 = Organisation.find_by_name(name2)
	page.should_not have_content org1.telephone
	page.should_not have_content org1.address
	page.should_not have_content org2.telephone
	page.should_not have_content org2.address
end

When(/^I visit "(.*?)"$/) do |path|
	visit path
end

Then /^I should( not)? see an edit button for "(.*?)" charity$/ do |negate, name|
	expectation_method = negate ? :not_to : :to
	org = Organisation.find_by_name name
	expect(page).send(expectation_method,
										have_link('Edit', href: edit_organisation_path(org)))
end

Then /^I should( not)? see an edit button for "(.*?)" volunteer opportunity$/ do |negate, title|
	expectation_method = negate ? :not_to : :to
	op = VolunteerOp.find_by_title title
	expect(page).send(expectation_method,
										have_link('Edit', href: edit_volunteer_op_path(op.id)))
end

Then /^I should( not)? see "(.*?)" in the charity superadmin email$/ do |negate,email|
	expectation_method = negate ? :not_to : :to
	expect(page).send(expectation_method, have_selector('li', text: email))
end