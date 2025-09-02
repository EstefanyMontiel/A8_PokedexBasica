    import React, { useState } from "react";
    import { View, TextInput, TouchableOpacity, Text } from "react-native";
    import styles from "../styles";

    export default function PokemonForm({ onAddPokemon, onCancel }) {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleAdd = () => {
//Verificacion de URL 
        if (imageUrl && !imageUrl.startsWith('http')) {
    Alert.alert("URL inválida", "La URL de la imagen debe comenzar con http o https");
    return;
    } 

        onAddPokemon({ name, type, imageUrl });
        setName("");
        setType("");
        setImageUrl("");
    };

    return (
        <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Agregar Nuevo Pokémon</Text>
        <TextInput
            style={styles.input}
            placeholder="Nombre del Pokémon"
            value={name}
            onChangeText={setName}
        />
        <TextInput
            style={styles.input}
            placeholder="Tipo (Fuego, Agua, etc.)"
            value={type}
            onChangeText={setType}
        />
        <TextInput
            style={styles.input}
            placeholder="URL de la imagen"
            value={imageUrl}
            onChangeText={setImageUrl}
        />
        <View style={styles.formButtons}>
            <TouchableOpacity style={[styles.formButton, styles.cancelButton]} onPress={onCancel}>
            <Text style={styles.formButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.formButton, styles.addButton]} onPress={handleAdd}>
            <Text style={styles.formButtonText}>Agregar</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
    }