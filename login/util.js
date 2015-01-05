define([], function() {
	return {
		saveData: function(key, value) {
			localStorage.setItem(key, JSON.stringify(value))
		},

		getData: function(key) {
			return JSON.parse(localStorage.getItem(key))
		}
	}
})