// Browser storage fixture

संग्रह.setItem('theme', 'light');
संग्रह.setItem('language', 'hindi');
सत्र_संग्रह.setItem('token', 'abc123');
संग्रह.setItem('theme', 'dark');
संग्रह.setItem('theme', 'light');

नया theme = संग्रह.getItem('theme');
नया language = संग्रह.getItem('language');
नया token = सत्र_संग्रह.getItem('token');
नया missingProfile = संग्रह.getItem('profile');
नया missingSession = सत्र_संग्रह.getItem('refreshToken');

विंडो.__hindicode_storage_result = {
    theme,
    language,
    token,
    missingProfile,
    missingSession,
    themeExists: theme बराबर 'light',
    tokenExists: token बराबर 'abc123',
    missingValuesReturnNull: missingProfile बराबर खाली और missingSession बराबर खाली
};
