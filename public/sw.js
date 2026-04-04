self.addEventListener("push", (event) => {
  if (!event.data) return;

  let payload = {};
  try {
    payload = event.data.json();
  } catch {
    payload = { title: "Neuer Auftrag", body: event.data.text() };
  }

  const title = typeof payload.title === "string" && payload.title ? payload.title : "Neuer Auftrag";
  const body =
    typeof payload.body === "string" && payload.body
      ? payload.body
      : "Ihnen wurde ein neuer Auftrag zugeteilt";
  const url = typeof payload.url === "string" && payload.url ? payload.url : "/admin/dashboard";
  const tag = typeof payload.tag === "string" && payload.tag ? payload.tag : "new-assignment";

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      tag,
      data: { url },
      badge: "/apple-icon.png",
      icon: "/icon.png",
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const rawUrl = event.notification.data && typeof event.notification.data.url === "string"
    ? event.notification.data.url
    : "/admin/dashboard";
  const targetUrl = new URL(rawUrl, self.location.origin).toString();

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ("focus" in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
      return undefined;
    })
  );
});
