import { derived } from 'svelte/store';
import { currentLanguage } from '$lib/stores/language';
import * as m from '$lib/paraglide/messages';

export const signUpTranslations = derived(currentLanguage, () => ({
	heroHeader: m.sign_up_hero_header(),
	heroSubheader: m.sign_up_hero_subheader(),
	title: m.sign_up(),
	firstName: m.sign_up_first_name(),
	lastName: m.sign_up_last_name(),
	email: m.sign_up_your_email(),
	password: m.sign_up_your_password(),
	confirmPassword: m.sign_up_confirm_password(),
	acceptTerms: m.sign_up_i_accept_terms_and_conditions(),
	alreadyHaveAccount: m.sign_up_already_have_account(),
	submitButton: m.sign_up(),
	invalidEmailError: m.sign_up_invalid_email_error(),
	userExistsError: m.sign_up_user_already_exists_error(),
	unknownError: m.sign_up_unknown_error(),
	invalidPasswordError: m.sign_up_invalided_password_error(),
	passwordsDoNotMatchError: m.sign_up_passwords_do_not_match()
}));
