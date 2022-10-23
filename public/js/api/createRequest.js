/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
	xhr.responseType = 'json';
	let formData = null;

	let url = options.url;
	if (options.data) {
		if (options.method === 'GET') {
			url += '?' + Object.entries(options.data).map(
				entry => entry.map(encodeURIComponent).join('=')
			).join('&');
		} else {
			formData = new FormData();
			Object.entries(options.data).forEach(V => formData.append(...V));
		}
	}

	xhr.onreadystatechange = () => {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			let err = null;
			let resp = null;

			if (xhr.status === 200) {
				const r = xhr.response;
				if (r && r.success) {
					resp = r;
				} else {
					err = r;
				}
			} else {
				err = new Error('Ошибка');
			}
			options.callback(err, resp);
		}
	}

	xhr.open(options.method, url);
	xhr.send(formData);
};
