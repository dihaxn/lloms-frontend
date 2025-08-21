const CACHE_NAME = 'little-lanka-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/styles/index.css',
  '/src/styles/App.css',
  '/src/assets/websitenavbar/logo.png',
  '/src/assets/websitenavbar/background.png'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  // Skip API calls and localhost URLs in service worker to avoid CORS issues
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('localhost:8080') || 
      event.request.url.includes('localhost:8088') ||
      event.request.url.includes('localhost:')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
      .catch((error) => {
        console.log('Service worker fetch failed:', error);
        // Return offline page if both cache and network fail
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        // Return a basic response for other failed requests
        return new Response('Offline content not available', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/src/assets/websitenavbar/logo.png',
    badge: '/src/assets/websitenavbar/logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/src/assets/websitenavbar/logo.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/src/assets/websitenavbar/logo.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Little Lanka', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background sync function
async function doBackgroundSync() {
  try {
    // Perform background sync operations
    console.log('Performing background sync...');
    
    // Example: sync offline data
    const offlineData = await getOfflineData();
    if (offlineData.length > 0) {
      await syncOfflineData(offlineData);
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Get offline data from IndexedDB
async function getOfflineData() {
  // Implementation depends on your data storage strategy
  return [];
}

// Sync offline data with server
async function syncOfflineData(data) {
  // Implementation depends on your API structure
  console.log('Syncing offline data:', data);
}
