import { getUTCTimeForStartOfNextDay, getUTCTimeForStartOfNextWeek } from './functions.svelte';

class Task {
	constructor(
		public readonly id: string,
		public readonly category: string,
		public readonly name: string,
		public readonly interval: 'daily' | 'weekly',
		public readonly icon: string,
		public readonly link: string,
		public readonly description?: string,
		public readonly location?: string,
		public readonly timer?: Timer,
		public display: boolean = false,
		public checked: boolean = false
	) {
		this.id = id;
		this.category = category;
		this.name = name;
		this.interval = interval;
		this.icon = icon;
		this.link = link;
		this.description = description;
		this.location = location;
		this.timer = timer;
		this.display = display;
		this.checked = checked;
	}

	setDisplay(display: boolean) {
		this.display = display;
		this.setCookie('display');
	}

	setChecked(checked: boolean) {
		this.checked = checked;
		this.setCookie('checked');
	}

	getCookieValue() {
		const cookies = document.cookie.split('; ').map((cookie) => {
			const [name, value] = cookie.split('=');
			const [namespace, subname] = name.split('.');
			return { namespace, subname, value };
		});
		cookies.forEach(({ namespace, subname, value }) => {
			if (namespace === this.id) {
				if (subname === 'display') {
					this.display = value === 'true';
				} else if (subname === 'checked') {
					this.checked = value === 'true';
				}
			}
		});
	}

	setCookie(cookieType: string) {
		let time = new Date().getTime();
		let suffix: string;
		let value: boolean;

		switch (cookieType) {
			case 'checked': {
				value = Boolean(this.checked);
				suffix = '.checked';
				switch (this.interval) {
					case 'daily': {
						time = getUTCTimeForStartOfNextDay().getTime();
						break;
					}
					case 'weekly': {
						time = getUTCTimeForStartOfNextWeek().getTime();
						break;
					}
					default: {
						return;
					}
				}
				break;
			}
			case 'display': {
				value = Boolean(this.display);
				suffix = '.display';
				time += 365 * 24 * 60 * 60 * 1000;
				break;
			}
			default: {
				return;
			}
		}
		document.cookie =
			this.id + suffix + '=' + value + ';expires=' + new Date(time).toUTCString() + ';path=/';
	}
}

class Timer {
	constructor(
		public readonly duration: [number, number],
		public readonly times: [number, number, string?][]
	) {
		this.duration = duration;
		this.times = times;
	}
}
