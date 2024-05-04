

const { randomBytes } = await import('node:crypto');
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj);
};

export const generateUsername = (name) => {
	const id = randomBytes(2).toString('hex');
	return `${name.slice(0, 5)}${id}`;
};

export const getImageURL = (collectionId, recordId, fileName, size = '0x0') => {
	return `${PUBLIC_POCKETBASE_URL}/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};

export const validateData = async (formData, schema) => {
	const body = Object.fromEntries(formData);

	try {
		const data = schema.parse(body);
		return {
			formData: data,
			errors: null
		};
	} catch (err) {
		console.log('Error: ', err);
		const errors = err.flatten();
		return {
			formData: body,
			errors
		};
	}
};

export function getFormattedDateTime(dateTimeString) {
	const dateTime = new Date(dateTimeString);

	const options = {
		timeZone: 'America/Los_Angeles', // Specify the desired time zone
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	};

	return dateTime.toLocaleString('en-US', options);
}


export const isOld = (date) => {
	const currentDate = new Date(); // Current date
	const updatedDate = new Date(date); // Replace with page.updated value
	const differenceInMilliseconds = currentDate - updatedDate;
	const daysDifference = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
	if (daysDifference > 30) {
		return true;
	}
};

export const isNew = (date) => {
	const currentDate = new Date(); // Current date
	const createDate = new Date(date); // Replace with page.updated value
	const differenceInMilliseconds = currentDate - createDate;
	const daysDifference = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
	if (daysDifference < 1) {
		return true;
	}
};

