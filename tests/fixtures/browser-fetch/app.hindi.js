// Browser fetch success/error fixture

असिंक कार्य लाओ_रिपोर्ट() {
    नया summary = { success: खाली, error: खाली };

    कोशिश {
        स्थिर okResponse = इंतज़ार लाओ('/api/success');
        स्थिर okData = इंतज़ार okResponse.जेसन_डेटा();
        summary.success = okData.message;
    } पकड़ो (e) {
        summary.success = e.message;
    }

    कोशिश {
        इंतज़ार लाओ('/api/fail');
    } पकड़ो (e) {
        summary.error = e.message;
    }

    विंडो.__hindicode_fetch_result = summary;
}

लाओ_रिपोर्ट();
