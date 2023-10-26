const objectiveChart = document.getElementById("objectiveChart");
// data dictionary
var objectiveStatusData = {
	labels: [],
	datasets: [
		{
			label: "",
			data: [],
			backgroundColor: ["#8de5b3", "#f0a8a6", "#8ed1f7", "#f8e08e", "#c2c7cc"],
			hoverOffset: 3,
		},
	],
};
function isChartEmpty(chartData) {
	if (!chartData) {
		return true;
	}
	for (let i = 0; i < chartData.length; i++) {
		
		if (chartData[i]) {
			const hasNonZeroValues = chartData.some((value) => value !== 0);
			if (hasNonZeroValues) {
				return false;
			}
		}
	}
	return true;
}

// chart constructor
if (objectiveChart != null) {
	var objectiveStatusChart = new Chart(objectiveChart, {
		type: "doughnut",
		data: objectiveStatusData,
		options: {
			onClick: (e, activeEls) => {
				let datasetIndex = activeEls[0].datasetIndex;
				let dataIndex = activeEls[0].index;
				let datasetLabel = e.chart.data.datasets[datasetIndex].label;
				let value = e.chart.data.datasets[datasetIndex].data[dataIndex];
				let label = e.chart.data.labels[dataIndex];
				let params = "?status=" + label + "&archive=false";

				$.ajax({
					url: "/pms/objective-list-search" + params,
					type: "GET",
					headers: {
						"X-Requested-With": "XMLHttpRequest",
					},
					success: (response) => {
						$("#dashboard").html(response);
					},
					error: (error) => {
						console.log("Error", error);
					},
				});
				$("#back_button").removeClass("d-none");
			},
		},
	});
}

function objectiveStatusDataUpdate(data) {
	objectiveStatusData.labels = data.objective_label;
	objectiveStatusData.datasets[0].data = data.objective_value;
	objectiveStatusChart.update();
}

$.ajax({
	url: "/pms/dashboard-objective-status",
	type: "GET",
	dataType: "json",
	headers: {
		"X-Requested-With": "XMLHttpRequest",
	},
	success: (response) => {
		if (isChartEmpty(response.objective_value)) {
			$("#objectiveChart")
				.parent()
				.html(
					`<div style="height: 320px; display:flex;align-items: center;justify-content: center;" class="">
                        <div style="" class="">
                        <img style="display: block;width: 70px;margin: 20px auto ;" src="/static/images/ui/joiningchart.png" class="" alt=""/>
                        <h3 style="font-size:16px" class="oh-404__subtitle">${response.message}</h3>
                        </div>
                    </div>`
				);
		} else {
			objectiveStatusDataUpdate(response);
		}
	},
	error: (error) => {
		console.log("Error", error);
	},
});

// chart change
$("#objective-status-chart").click(function (e) {
	var chartType = objectiveStatusChart.config.type;
	if (chartType === "line") {
		chartType = "bar";
	} else if (chartType === "bar") {
		chartType = "doughnut";
	} else if (chartType === "doughnut") {
		chartType = "pie";
	} else if (chartType === "pie") {
		chartType = "line";
	}
	objectiveStatusChart.config.type = chartType;
	objectiveStatusChart.update();
});

// objecitve chart section end

const keyResultStatusChartCtx = document.getElementById("keyResultChart");

// data dictionary
var keyResultStatusData = {
	labels: [],
	datasets: [
		{
			label: "",
			data: [],
			backgroundColor: ["#8de5b3", "#f0a8a6", "#8ed1f7", "#f8e08e", "#c2c7cc"],
			hoverOffset: 3,
		},
	],
};

// chart constructor
if (keyResultStatusChartCtx != null) {
	var keyResultStatusChart = new Chart(keyResultStatusChartCtx, {
		type: "pie",
		data: keyResultStatusData,
		options: {
			onClick: (e, activeEls) => {
				let datasetIndex = activeEls[0].datasetIndex;
				let dataIndex = activeEls[0].index;
				let datasetLabel = e.chart.data.datasets[datasetIndex].label;
				let value = e.chart.data.datasets[datasetIndex].data[dataIndex];
				let label = e.chart.data.labels[dataIndex];
				let params = "?status=" + label + "&archive=false";

				$.ajax({
					url: "/pms/key-result-view" + params,
					type: "GET",
					headers: {
						"X-Requested-With": "XMLHttpRequest",
					},
					success: (response) => {
						$("#dashboard").html(response);
					},
					error: (error, response) => {
						console.log(response);
						console.log("Error", error);
					},
				});
				$("#back_button").removeClass("d-none");
			},
		},
	});
}

function keyResultStatusDataUpdate(data) {
	keyResultStatusData.labels = data.key_result_label;
	keyResultStatusData.datasets[0].data = data.key_result_value;
	keyResultStatusChart.update();
}

$.ajax({
	url: "/pms/dashbord-key-result-status",
	type: "GET",
	dataType: "json",
	headers: {
		"X-Requested-With": "XMLHttpRequest",
	},
	success: (response) => {
		if (isChartEmpty(response.key_result_value)) {
			$("#keyResultChart")
				.parent()
				.html(
					`<div style="height: 320px; display:flex;align-items: center;justify-content: center;" class="">
                        <div style="" class="">
                        <img style="display: block;width: 70px;margin: 20px auto ;" src="/static/images/ui/joiningchart.png" class="" alt=""/>
                        <h3 style="font-size:16px" class="oh-404__subtitle">${response.message}</h3>
                        </div>
                    </div>`
				);
		} else {
			keyResultStatusDataUpdate(response);
		}
	},
	error: (error) => {
		console.log("Error", error);
	},
});

// chart change
$("#key-result-status-chart").click(function (e) {
	var chartType = keyResultStatusChart.config.type;
	if (chartType === "line") {
		chartType = "bar";
	} else if (chartType === "bar") {
		chartType = "doughnut";
	} else if (chartType === "doughnut") {
		chartType = "pie";
	} else if (chartType === "pie") {
		chartType = "line";
	}
	keyResultStatusChart.config.type = chartType;
	keyResultStatusChart.update();
});

// key result chart section

const feedbackStatusChartCtx = document.getElementById("feedbackChart");

// data dictionary
var feedbackStatusData = {
	labels: [],
	datasets: [
		{
			label: "Feedback",
			data: [],
			backgroundColor: ["#8de5b3", "#f0a8a6", "#8ed1f7", "#f8e08e", "#c2c7cc"],
			hoverOffset: 3,
		},
	],
};

// chart constructor
if (feedbackStatusChartCtx != null) {
	var feedbackStatusChart = new Chart(feedbackStatusChartCtx, {
		type: "pie",
		data: feedbackStatusData,
		options: {
			onClick: (e, activeEls) => {
				let datasetIndex = activeEls[0].datasetIndex;
				let dataIndex = activeEls[0].index;
				let datasetLabel = e.chart.data.datasets[datasetIndex].label;
				let value = e.chart.data.datasets[datasetIndex].data[dataIndex];
				let label = e.chart.data.labels[dataIndex];
				let params = "?status=" + label + "&archive=false";

				$.ajax({
					url: "/pms/feedback-list-search" + params,
					type: "GET",
					headers: {
						"X-Requested-With": "XMLHttpRequest",
					},
					success: (response) => {
						$("#dashboard").html(response);
					},
					error: (error) => {
						console.log("Error", error);
					},
				});
				$("#back_button").removeClass("d-none");
			},
		},
	});
}

function feedbackStatusDataUpdate(data) {
	feedbackStatusData.labels = data.feedback_label;
	feedbackStatusData.datasets[0].data = data.feedback_value;
	feedbackStatusChart.update();
}

$.ajax({
	url: "/pms/dashboard-feedback-status",
	type: "GET",
	dataType: "json",
	headers: {
		"X-Requested-With": "XMLHttpRequest",
	},
	success: (response) => {
		if (isChartEmpty(response.feedback_value)) {
			$("#feedbackChart")
				.parent()
				.html(
					`<div style="height: 320px; display:flex;align-items: center;justify-content: center;" class="">
                        <div style="" class="">
                        <img style="display: block;width: 70px;margin: 20px auto ;" src="/static/images/ui/joiningchart.png" class="" alt=""/>
                        <h3 style="font-size:16px" class="oh-404__subtitle">${response.message}</h3>
                        </div>
                    </div>`
				);
		} else {
			feedbackStatusDataUpdate(response);
		}
	},
	error: (error) => {
		console.log("Error", error);
	},
});

// chart change
$("#feedback-status-chart").click(function (e) {
	var chartType = feedbackStatusChart.config.type;
	if (chartType === "line") {
		chartType = "bar";
	} else if (chartType === "bar") {
		chartType = "doughnut";
	} else if (chartType === "doughnut") {
		chartType = "pie";
	} else if (chartType === "pie") {
		chartType = "line";
	}
	feedbackStatusChart.config.type = chartType;
	feedbackStatusChart.update();
});
