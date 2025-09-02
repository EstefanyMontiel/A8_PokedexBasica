    import React, { useState } from "react";
    import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
    import styles from "../styles";

    // Función para obtener color segun tipo
    const getTypeColor = (type) => {
    const typeColors = {
        normal: "#A8A878",
        fire: "#F08030",
        water: "#6890F0",
        electric: "#F8D030",
        grass: "#78C850",
        ice: "#98D8D8",
        fighting: "#C03028",
        poison: "#A040A0",
        ground: "#E0C068",
        flying: "#A890F0",
        psychic: "#F85888",
        bug: "#A8B820",
        rock: "#B8A038",
        ghost: "#705898",
        dragon: "#7038F8",
        dark: "#705848",
        steel: "#B8B8D0",
        fairy: "#EE99AC",

        // Tipos en español
        eléctrico: "#F8D030",
        hielo: "#A0DAEAD4",
        planta: "#78C850",
        veneno: "#A040A0",
        volador: "#A890F0",
        agua: "#6890F0",
        hada: "#EE99AC",
        fantasma: "#705898",
        fuego: "#F08030",
    };

    // Buscar el tipo 
    const firstType = type.toLowerCase().split(",")[0].trim();
    return typeColors[firstType] || "#A8A878";
    };

    export default function PokemonCard({ pokemon, onToggle, onViewDetails, onDelete }) {
    const typeColor = getTypeColor(pokemon.type);
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    
    const handleImageError = () => {
        setImageError(true);
        setImageLoading(false);
    };

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    return (
        <TouchableOpacity 
        style={[styles.card, { backgroundColor: typeColor }, pokemon.isCaught && styles.caughtCard]} 
        onPress={onViewDetails}
        >
        {/* Botón de eliminar */}
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.deleteButtonText}>X</Text>
        </TouchableOpacity>

        <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, styles.whiteText]}>{pokemon.name}</Text>
            <View style={[styles.statusIndicator, pokemon.isCaught ? styles.caughtIndicator : styles.freeIndicator]}>
            <Text style={styles.statusText}>{pokemon.isCaught ? "✅" : "❌"}</Text>
            </View>
        </View>
        
        <View style={styles.imageContainer}>
            {imageLoading && (
            <ActivityIndicator size="small" color="#fff" style={styles.loadingIndicator} />
            )}
            {imageError ? (
            <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>No image</Text>
            </View>
            ) : (
            <Image
                source={{ uri: pokemon.imageUrl }}
                style={[styles.image, imageLoading && { opacity: 0 }]}
                onError={handleImageError}
                onLoad={handleImageLoad}
                onLoadEnd={() => setImageLoading(false)}
            />
            )}
        </View>
        
        <View style={styles.typeContainer}>
            <Text style={[styles.typeText, styles.whiteText]}>{pokemon.type}</Text>
        </View>
        
        <TouchableOpacity 
            style={[styles.catchButton, pokemon.isCaught && styles.caughtButton]}
            onPress={onToggle}
        >
            <Text style={styles.catchButtonText}>
            {pokemon.isCaught ? "Liberar" : "Atrapar"}
            </Text>
        </TouchableOpacity>
        </TouchableOpacity>
    );
    }