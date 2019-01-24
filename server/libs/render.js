module.exports = (data) => {
    console.log(typeof data)
    let html = '';

    for (const key in data) {
        html += `<li style="margin-bottom: 20px; font-size: 16px;">${key}: ${data[key] || '(Не указано)'}</li>`;
    }

    return html;
}