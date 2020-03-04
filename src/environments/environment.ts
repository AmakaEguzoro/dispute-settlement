// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// export const environment = {
//   production: false,
//   firebase: {
//     apiKey: "AIzaSyCE0CcBSy649zsnglfyNvYsmSAVz7a7WjU",
//     authDomain: "asdev-admin-e98f8.firebaseapp.com",
//     databaseURL: "https://apc-election.firebaseio.com",
//     projectId: "asdev-admin-e98f8",
//     storageBucket: "asdev-admin-e98f8.appspot.com",
//     messagingSenderId: "1094553047304"
//   }
// };

export const environment = {
	production: false,
	useMocks: false,
	api: {
		//   baseUrl: 'https://vas.itexapp.com/api/v1'
		baseUrl: 'http://197.253.19.76:6200/api/v1'
	}
};