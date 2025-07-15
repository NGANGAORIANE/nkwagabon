import express from 'express';
import cors from 'cors';

import restaurantRoutes from './routes/restaurants.js';
import eventsRoutes from './routes/events.js';
import placesRoutes from './routes/places.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Nkwagabon fonctionne ✅');
});

app.use('/restaurants', restaurantRoutes);
app.use('/events', eventsRoutes);
app.use('/places', placesRoutes);

app.listen(port, () => {
    console.log(`✅ Serveur lancé : http://localhost:${port}`);
});
