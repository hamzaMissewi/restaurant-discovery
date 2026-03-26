-- Database Schema for KmandyFood Application

-- Create database (run this first)
-- CREATE DATABASE KmandyFood;

-- Users table with cookie consent
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    role VARCHAR(50) DEFAULT 'client', -- 'client', 'restaurant_owner', 'admin'
    cookie_consent VARCHAR(10), -- 'accept', 'decline', NULL
    cookie_consent_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    image VARCHAR(500),
    banner VARCHAR(500),
    logo VARCHAR(500),
    rating DECIMAL(3,2) DEFAULT 0.0,
    reviews INTEGER DEFAULT 0,
    welcome TEXT,
    hours TEXT,
    categories TEXT[], -- PostgreSQL array for restaurant categories
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'inactive', 'pending'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu items table
CREATE TABLE IF NOT EXISTS menu_items (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image VARCHAR(500),
    rating DECIMAL(3,2) DEFAULT 0.0,
    reviews INTEGER DEFAULT 0,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'
    delivery_address TEXT,
    delivery_phone VARCHAR(20),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table (for many-to-many relationship between orders and menu items)
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL, -- Price at time of order
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
    menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, restaurant_id, menu_item_id) -- One review per user per item/restaurant
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_restaurants_owner_id ON restaurants(owner_id);
CREATE INDEX IF NOT EXISTS idx_restaurants_slug ON restaurants(slug);
CREATE INDEX IF NOT EXISTS idx_restaurants_status ON restaurants(status);
CREATE INDEX IF NOT EXISTS idx_menu_items_restaurant_id ON menu_items(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_restaurant_id ON orders(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_restaurant_id ON reviews(restaurant_id);

-- Create trigger to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger to all tables with updated_at column
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_restaurants_updated_at BEFORE UPDATE ON restaurants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO users (email, name, password_hash, phone, address, role) VALUES
('contact@hamzamissaoui.dev', 'Hamza Missaoui', '$2b$10$example_hash', '+21612345678', 'Tunis, Tunisia', 'admin'),
('restaurant@example.com', 'Restaurant Owner', '$2b$10$example_hash', '+21687654321', 'Sousse, Tunisia', 'restaurant_owner'),
('client@example.com', 'Client User', '$2b$10$example_hash', '+21611223344', 'Tunis, Tunisia', 'client')
ON CONFLICT (email) DO NOTHING;

-- Insert sample restaurants
INSERT INTO restaurants (owner_id, name, slug, description, address, phone, email, image, banner, rating, reviews, welcome, hours, categories, status) VALUES
(2, 'King Tacos', 'king-tacos', 'Best tacos in town', 'Rue la République 56, Sayada, MONASTIR', '+21612345678', 'king@tacos.tn', '/restaurants/tacos-burger.png', '/restaurants/tacos-banner.png', 5.0, 788, 'Welcome to King Tacos!', 'Lundi-Vendredi: 12:00 am - 01:00 am | Samedi-Dimanche: 12:00 am - 12:00 am', ARRAY['Tacos', 'Pizza', 'Makloub', 'Burger'], 'active'),
(2, 'Restaurant Africain Les Délices d''Afrique', 'restaurant-africain-delices-afrique', 'Authentic African cuisine', '2 rue Hedi nouira, EL MENZAH 1, TUNIS', '+21623456789', 'africain@delices.tn', '/restaurants/africain-delices-afrique.png', '/restaurants/africain-banner.png', 5.0, 708, 'Welcome to Les Délices d''Afrique!', 'Lundi-Vendredi: 12:00 am - 01:00 am | Samedi-Dimanche: 12:00 am - 22:00', ARRAY['Grillades', 'Bowls', 'Box', 'Afro'], 'active')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample menu items
INSERT INTO menu_items (restaurant_id, name, description, price, category, image, rating, reviews) VALUES
(1, 'Tacos Royal', 'Deluxe tacos with beef', 18.00, 'Tacos', '/restaurants/tacos/tacos-royal.png', 4.8, 156),
(1, 'Pizza Margherita', 'Classic Italian pizza', 15.00, 'Pizza', '/restaurants/pizza/margherita.png', 4.5, 89),
(2, 'Brochette Agneau', 'Grilled lamb skewers', 22.00, 'Grillades', '/restaurants/grillades/brochette-agneau.png', 4.8, 78)
ON CONFLICT DO NOTHING;
