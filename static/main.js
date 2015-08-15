var app = angular.module('monitorApp', []);

app.controller('mainController', function($scope, $http) {

    $http.get('/api/GetServerGroups').then(function(response) {
        for (var i in response.data) {
            for (var k in response.data[i].Servers) {
                var s = response.data[i].Servers[k];
                s.UsingEndTime = new Date(s.UsingEndTime);
            }
        }
        $scope.groups = response.data;
    }, function(response) {
        alert("/api/GetServerGroups error: " + response.data);
    });

    $scope.ChangeStatus = function(s, groupName) {
        var action = s.Status == "Using" ? "Release" : "Use";

        if (action == "Use") {
            if (s.Username.trim() == "") {
                alert("Please type your username!");
                return;
            }
            if (s.UsingEndTime == null) {
                alert("Please type Using End Time!");
                return;
            }
        }

        if (confirm("Confirm to " + action + " : " + s.ServerName + "?")) {
            s.GroupName = groupName;

            s.Status = action == "Release" ? "Available" : "Using";
            if (action == "Release") {
                s.Username = "";
                s.UsingEndTime = "";
            }

            $http.post('/api/SaveServer', s).then(function(response) {
                // alert(response.data);
            }, function(response) {
                alert("/api/SaveServer error: " + response.data);
            });
        }
    };

});
