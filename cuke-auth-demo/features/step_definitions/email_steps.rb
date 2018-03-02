Then(/^I should( not)? receive a "([^"]*)" email$/) do |negate, subject|
	check_email(nil, negate, subject)
end

Then(/^the user should( not)? receive a "([^"]*)" email$/) do |negate, subject|
	check_email('random@morerandom.com', negate, subject)
end

And /^"(.*?)" should( not)? receive a "(.*?)" email(?: containing "(.*)")?$/ do |user_email, negate, subject, body|
	check_email(user_email, negate, subject, body)
end

def check_email(email, negate, subject, body = nil)
	unless negate
		expect(ActionMailer::Base.deliveries.size).to eq 1
		expect(ActionMailer::Base.deliveries[0].subject).to include(subject)
		expect(ActionMailer::Base.deliveries[0].body).to include(body) unless body.nil?
		expect(ActionMailer::Base.deliveries[0].to).to include(email) unless email.nil?
	else
		expect(ActionMailer::Base.deliveries.size).to eq 0
	end
end

And /^I should not receive an email$/ do
	expect(ActionMailer::Base.deliveries.size).to eq 0
end

And /^the email queue is clear$/ do
	ActionMailer::Base.deliveries.clear
end

When(/^replies to that email should go to "([^"]*)"$/) do |email|
	@email = ActionMailer::Base.deliveries.last
	expect(@email.reply_to).to include email
end

Given(/^I click on the retrieve password link in the last email$/) do
	password_reset_link = ActionMailer::Base.deliveries.last.body.match(
			/<a href=\"(.+)\">Change my password<\/a>/
	)[1]

	visit password_reset_link
end

And /^I should receive a "(.*?)" email$/ do |subj|
	mails = ActionMailer::Base.deliveries
	expect(mails).not_to be_empty
	subjects = mails.map(&:subject)
	expect(subjects).to include subj
end

Then(/^an email should be sent to "(.*?)" as notification of the signup by email "(.*?)"$/) do |email, user_email|
	message = "A new user with the email #{user_email} has signed up on Harrow Community Network."
	expect_email_exists(message: message,email: email)
end


And(/^an email should be sent to "(.*?)" as notification of the proposed edit to "(.*?)"$/) do |email, org_name|
	message = "There is an edit awaiting for your approval on #{org_name}."
	expect_email_exists(message: message, email: email)
end

And(/^an email should be sent to "(.*?)" as notice of becoming org admin of "(.*?)"$/) do |email, org_name|
	message = "You have been made an organisation admin for the organisation called #{org_name} on the Harrow Community Network. After logging in,
you will be able to update your organisation's directory entry."
	expect_email_exists(message: message, email: email, link: organisation_url(Organisation.find_by(name: org_name)),
											link_text: "Click here to view your organisation on the Harrow Community Network.")
end

And(/^an email should be sent to "(.*?)" as notification of the request for admin status of "(.*?)"$/) do |email, org_name|
	message = "There is a user waiting for your approval on #{org_name}"
	expect_email_exists(message: message,email: email)
end
