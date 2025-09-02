import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Modal, ScrollView,Image, Button} from "react-native";
import PokemonCard from "./components/PokemonCard";
import PokemonForm from "./components/PokemonForm";

import styles from "./styles";

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const addPokemon = (pokemon) => {
    if (!pokemon.name || !pokemon.type || !pokemon.imageUrl) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    setPokemonList([
      ...pokemonList,
      { ...pokemon, isCaught: false, id: Date.now().toString() },
    ]);
    setShowForm(false);
  };

  const toggleCaught = (id) => {
    const newList = pokemonList.map(pokemon => 
      pokemon.id === id ? { ...pokemon, isCaught: !pokemon.isCaught } : pokemon
    );
    setPokemonList(newList);
  };

  const deletePokemon = (id) => {
    Alert.alert(
      "Eliminar Pokémon",
      "¿Estás seguro de que quieres eliminar este Pokémon?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive",
          onPress: () => {
            setPokemonList(pokemonList.filter(pokemon => pokemon.id !== id));
          }
        }
      ]
    );
  };

  const showPokemonDetails = (pokemon) => {
    setSelectedPokemon(pokemon);
    setModalVisible(true);
  };

  const totalCaught = pokemonList.filter(p => p.isCaught).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pokédex</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{pokemonList.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalCaught}</Text>
          <Text style={styles.statLabel}>Atrapados</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{pokemonList.length - totalCaught}</Text>
          <Text style={styles.statLabel}>Restantes</Text>
        </View>
      </View>

      {showForm ? (
        <PokemonForm 
          onAddPokemon={addPokemon} 
          onCancel={() => setShowForm(false)} 
        />
      ) : (
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowForm(true)}
        >
          <Text style={styles.addButtonText}>+ Agregar Pokémon</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <PokemonCard 
            pokemon={item} 
            onToggle={() => toggleCaught(item.id)}
            onViewDetails={() => showPokemonDetails(item)}
            onDelete={() => deletePokemon(item.id)}

          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedPokemon && (
              <>
                <Text style={styles.modalTitle}>{selectedPokemon.name}</Text>
                  <View style={styles.modalImageContainer}>
                    <Image
                      source={{ uri: selectedPokemon.imageUrl }}
                      style={styles.modalImage}
                      onError={() => console.log("Error loading modal image")}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.modalType}>Tipo: {selectedPokemon.type}</Text>
                  <Text style={styles.modalStatus}>
                    Estado: {selectedPokemon.isCaught ? "Atrapado ✅" : "Libre "}
                  </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={[styles.modalButton, selectedPokemon.isCaught ? styles.releaseButton : styles.catchButton]}
                    onPress={() => {
                      toggleCaught(selectedPokemon.id);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalButtonText}>
                      {selectedPokemon.isCaught ? "Liberar" : "Atrapar"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.closeButton]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.modalButtonText}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}