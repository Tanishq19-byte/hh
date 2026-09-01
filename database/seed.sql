-- FoodVigil Seed Data

INSERT INTO food_codes (code, name, purpose, simple_explanation, safety_category, consumer_note) VALUES
('E621', 'Monosodium Glutamate (MSG)', 'Flavour enhancer', 'Used to enhance savoury, umami taste profile.', 'Attention', 'Generally recognized as safe by food authorities. Sensitive individuals may experience mild temporary discomfort if consumed in large quantities.'),
('E102', 'Tartrazine (FD&C Yellow No. 5)', 'Synthetic Food Colour', 'Adds vibrant yellow colouring to processed foods and beverages.', 'Attention', 'Approved colorant. May trigger mild allergic reactions or asthma symptoms in susceptible individuals.'),
('E211', 'Sodium Benzoate', 'Preservative', 'Inhibits growth of mold, yeast, and bacteria in acidic foods and drinks.', 'Informational', 'Widely used antimicrobial agent. safe within regulatory limit thresholds.'),
('E330', 'Citric Acid', 'Acidity regulator & antioxidant', 'Provides tart flavor and regulates pH level in food products.', 'Informational', 'Naturally occurring organic acid found in citrus fruits; safe for general consumption.'),
('E415', 'Xanthan Gum', 'Thickener & stabilizer', 'Prevents ingredient separation and improves texture.', 'Informational', 'Plant-derived soluble fiber compound commonly used in sauces and gluten-free baking.'),
('E150d', 'Sulphite Ammonia Caramel', 'Food Colorant', 'Provides dark brown hue to colas, sauces, and baked goods.', 'Informational', 'Standard food-grade colorant manufactured under controlled thermal conditions.');

INSERT INTO licenses (license_number, business_name, category, status, issued_date, expiry_date, address, is_demo) VALUES
('10015011002345', 'Himalaya Foods Ltd.', 'Food Manufacturer', 'Active', '2022-01-15', '2027-01-14', 'Plot 42, Industrial Area, Okhla Phase III, New Delhi, 110020', TRUE),
('10021022008912', 'NutriBite Consumer Goods', 'Packaged Snack Processor', 'Active', '2021-06-10', '2026-06-09', 'Sector 62, Knowledge Park, Noida, UP, 201309', TRUE),
('10018043004567', 'PureSpices & Oils Pvt Ltd', 'Spice Processing & Repackaging', 'Under Review', '2020-03-01', '2025-02-28', 'GIDC Estate, Unjha, Gujarat, 384170', TRUE),
('10019011009999', 'FakeCorp Snacks (Suspended)', 'Repackaging Unit', 'Suspended', '2019-11-12', '2024-11-11', 'Unregistered Shed, Bawana Industrial Area, Delhi', TRUE);

INSERT INTO recalls (product_name, manufacturer, batch_number, reason, severity, region, source, source_url, recalled_date) VALUES
('Spiced Chilli Flakes 100g', 'PureSpices & Oils Pvt Ltd', 'BATCH-2026-04A', 'Detection of unauthorized synthetic dye (Sudan Red I) during routine market sampling.', 'Urgent', 'North India (Delhi NCR, Punjab)', 'FSSAI Safety Advisory', 'https://fssai.gov.in/recalls/2026-04A', '2026-08-20'),
('Almond Milk Crunch Drink 250ml', 'NutriBite Consumer Goods', 'L-8842', 'Undeclared Soy Protein allergen on batch label due to packaging line crossover.', 'Warning', 'Pan-India', 'Consumer Safety Notice', 'https://fssai.gov.in/alerts/allergen-8842', '2026-08-12'),
('Gold Butter Biscuits 200g', 'TastyTreat Bakes', 'B-1092', 'Elevated moisture levels resulting in potential premature fungal contamination.', 'Info', 'Western Region (Maharashtra, Goa)', 'Manufacturer Self-Recall', 'https://tastytreat.com/recalls/b1092', '2026-07-28');

INSERT INTO safety_alerts (title, category, summary, severity, affected_regions, advisory_source, published_date) VALUES
('Market Advisory: Checking Purity of Festival Sweets & Mawa', 'Dairy & Confectionery', 'FSSAI issues guidelines for consumers to check starch adulteration in खोया (Mawa) and Silver Foil (Vark) quality using simple iodine & spot checks.', 'High', 'All India', 'FSSAI Central Advisory', '2026-08-25'),
('Advisory on Proper Storage & Expiry Display on Loose Spices', 'Spices & Condiments', 'Vendors reminded to display mandatory FSSAI licence numbers and packaging date labels on all open spice containers.', 'Medium', 'State Food Safety Dept', '2026-08-18');
