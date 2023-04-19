importScripts('./ngsw-worker.js');

function handleNotificationClick(client, action, notification) {
    let actionData;

    if (action) {
        actionData = notification.data.onActionClick[`${action}`];
    } else {
        actionData = notification.data.onActionClick.default;
    }

    console.log('ACTION DATA', actionData);

    if (actionData.url) {
        if (this.registration.scope.slice(-1) === '/') {
            this.registration.scope = this.registration.scope.slice(0, -1);
        }
        if (actionData.url[0] === '/' || actionData.url[0] === '?') {
            actionData.url = this.registration.scope + actionData.url;
        }
    } else {
        actionData.url = this.registration.scope;
    }

    console.log('ACTION DATA', actionData);
    console.log('CLIENT', client);

    if (client) {
        switch (actionData.operation) {
            case 'openWindow':
                this.clients.openWindow(actionData.url);
                break;
            case 'focusLastFocusedOrOpen':
                client.focus();
                break;
            case 'navigateLastFocusedOrOpen':
                client.navigate(actionData.url);
                client.focus();
                break;
            case 'sendRequest':
                fetch(actionData.url);
                break;
        }
    } else {
        switch (actionData.operation) {
            case 'openWindow':
                this.clients.openWindow(actionData.url);
                break;
            case 'focusLastFocusedOrOpen':
                this.clients.openWindow(actionData.url);
                break;
            case 'navigateLastFocusedOrOpen':
                this.clients.openWindow(actionData.url);
                break;
            case 'sendRequest':
                fetch(actionData.url);
                break;
        }
    }
}

self.addEventListener('notificationclick', (event) => {
    console.log('\n\nNotification clicked!\n\n', event);

    event.notification.close();

    event.waitUntil(
        this.clients.matchAll({includeUncontrolled: true, type: 'window'})
            .then((clients) => {
                if (clients.length > 0) {
                    clients.forEach(client => {
                        handleNotificationClick(client, event.action, event.notification);
                    });
                } else {
                    handleNotificationClick(null, event.action, event.notification);
                }
            })
    );
});
