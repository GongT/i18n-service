import {globalVar} from "./global";
export function FetchApi(url: string, options: RequestInit) {
	options.credentials = 'include';
	
	if (!options.headers) {
		options.headers = new Headers();
	}
	options.headers.append('Authorization', globalVar.get('Authorization'));
	
	const p = fetch(url, options).then((response) => {
		if (response.status === 200) {
			return response.json();
		} else {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}
	}).then((data) => {
		if (data.status === 0) {
			return data;
		} else {
			throw new Error(data.message);
		}
	});
	
	p.catch((err) => {
		console.warn(err.message || err);
	});
	
	return p;
}
