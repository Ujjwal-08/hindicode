// tests/18_promises_real_world.hindi.js
// Production-style promise workflows and async aggregation

दिखाओ("🔗 Testing Promise.all and chaining...");

कार्य देरी_के_बाद(मान, ms) {
    लौटाओ नया बनाओ प्रॉमिस((हल) => समय_बाद(() => हल(मान), ms));
}

प्रॉमिस
    .सभी([
        देरी_के_बाद(5, 10),
        देरी_के_बाद(15, 10),
        देरी_के_बाद(25, 10)
    ])
    .फिर((मान) => {
        नया कुल = मान.कमकरो((योग, item) => योग + item, 0);
        बराबर_है(कुल, 45, "Promise.all से सही कुल मिलना चाहिए");
        दिखाओ("Promise.all कुल:", कुल);
    });

दिखाओ("📦 Testing backend-style normalization...");

कार्य अनुरोध_साफ़_करो(body) {
    अगर (!body.email) {
        फेंको नया बनाओ त्रुटि("email required");
    }

    लौटाओ {
        ...body,
        email: body.email.काटो().छोटे_अक्षर(),
        active: body.active ?? सच
    };
}

नया तैयार = अनुरोध_साफ़_करो({
    email: "  TEAM@HINDICODE.DEV ",
    active: झूठ
});

बराबर_है(तैयार.email, "team@hindicode.dev");
बराबर_है(तैयार.active, झूठ);
