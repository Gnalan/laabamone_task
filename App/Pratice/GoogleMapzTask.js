import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function GoogleMapTask() {
  // Hook to store region data
  const [region, setRegion] = useState({
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // Region data for Tokyo
  const tokyoRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      {/* Render MapView with Tokyo region */}
      <MapView
        style={styles.map}
        initialRegion={tokyoRegion} // Set Tokyo as initial region
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        {/* Marker for Tokyo */}
        <Marker coordinate={tokyoRegion}  pinColor="green" />
        <Marker
    coordinate={{
      latitude: 35.67714827145542,
      longitude: 139.6551462687416,
    }}
  />
      </MapView>
      {/* Display current region's latitude and longitude */}
      <View style={styles.coordinates}>
        <Text style={styles.text}>Current latitude: {region.latitude}</Text>
        <Text style={styles.text}>Current longitude: {region.longitude}</Text>
      </View>
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  coordinates: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 10,
    marginBottom: 40,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
