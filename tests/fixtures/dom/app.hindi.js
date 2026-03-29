// Hindicode DOM Interaction Fixture
दस्तावेज़.title = "हिन्दी कोड DOM";

स्थिर root = दस्तावेज़.तत्व_ढूँढो_आईडी_से('root');
अगर (root) {
    root.innerHTML = '<h1>नमस्ते दुनिया</h1>';
}

स्थिर button = दस्तावेज़.तत्व_ढूँढो('button');
अगर (button) {
    button.घटना_सुनो('click', कार्य() {
        कंसोल.log("बटन क्लिक हुआ!");
    });
}

// Window result for test verification
विंडो.__hindicode_dom_result = {
    title: दस्तावेज़.title,
    html: root ? root.innerHTML : ""
};
