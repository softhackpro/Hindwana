import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Make sure to install expo vector icons

// Sample product data (replace with your actual product data)
const products = [
  {
    id: '1',
    title: 'Wireless Headphones',
    description: 'Premium noise cancelling headphones with 20-hour battery life',
    price: 129.99,
    image: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2024/04/18152123/srinagar-1.jpeg?tr=w-480,f-jpg,pr-true', // Replace with your image path
  },
  {
    id: '2',
    title: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitor and sleep analysis',
    price: 89.99,
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Neeulm_Valley_AJK_%28Arang_Kel%29.jpg', // Replace with your image path
  },
  {
    id: '3',
    title: 'Portable Speaker',
    description: 'Waterproof Bluetooth speaker with deep bass and 12-hour playback',
    price: 59.99,
    image: 'https://images.wanderon.in/blogs/new/2023/07/top-min-31.jpg', // Replace with your image path
  },
  // Add more products as needed
];

const ProductCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
        
        <TouchableOpacity style={styles.buyButton} onPress={() => console.log('Add to cart:', item.id)}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
          <AntDesign name="shoppingcart" size={16} color="white" style={styles.cartIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const travel = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Let's Travel</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '900',
    // marginBottom: 16,
    padding: 20,
    color: '#000',
    textAlign: 'center',
    textShadowColor: '#aaa',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e91e63',
    marginBottom: 12,
  },
  buyButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 8,
  },
  cartIcon: {
    marginLeft: 4,
  },
});

export default travel;