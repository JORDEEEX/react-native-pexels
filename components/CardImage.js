import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/core';

const CardImage = ({image}) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity 
        style={styles.CardImage} 
        onPress={()=>navigation.navigate('ImageScreen',{ image })}>
            <Image source={{
                uri: image.src.portrait
                ? image.src.portrait
                :'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-hay-icono-de-imagen-disponible-ilustraci%C3%B3n-vectorial-plana.jpg?ver=6'}}
            style={{height:180, width: '100%'}}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    CardImage:{
        display:'flex',
        width: '50%',
        margin: 4,
        justifyContent: 'space-between',
        backgroundColor: '#2c292c',
        borderWidth: 0,
        borderRadius: 5,
    }
})
export default CardImage
