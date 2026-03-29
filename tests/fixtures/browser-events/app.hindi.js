// Browser advanced event fixture

दस्तावेज़.title = 'हिन्दी इवेंट परीक्षण';
नया eventLog = [];

स्थिर form = दस्तावेज़.तत्व_ढूँढो_आईडी_से('profile-form');
स्थिर input = दस्तावेज़.तत्व_ढूँढो('input');
स्थिर button = दस्तावेज़.तत्व_ढूँढो('button');

अगर (input) {
    input.घटना_सुनो('input', कार्य(event) {
        eventLog.push(`input:${event.target.value}`);
    });
}

अगर (button) {
    button.घटना_सुनो('click', कार्य() {
        eventLog.push('click:save');
    });
}

अगर (form) {
    form.घटना_सुनो('submit', कार्य(event) {
        event.preventDefault();
        eventLog.push('submit:done');
    });
}

विंडो.__hindicode_event_handlers_ready = सच;
विंडो.__hindicode_get_event_result = कार्य() {
    लौटाओ {
        title: दस्तावेज़.title,
        log: eventLog
    };
};
