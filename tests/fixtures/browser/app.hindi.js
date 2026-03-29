// Browser-targeted transpile fixture

दस्तावेज.title = "Hindicode Browser";
संग्रह.setItem("theme", "light");

असिंक कार्य प्रारंभ() {
    स्थिर response = इंतज़ार लाओ("/api/browser");
    स्थिर data = इंतज़ार response.जेसन_डेटा();

    विंडो.__hindicode_browser_result = {
        title: दस्तावेज.title,
        theme: संग्रह.getItem("theme"),
        status: data.status,
        count: data.items.लंबाई,
    };
}

प्रारंभ();
