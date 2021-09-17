import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ViewComponent } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { getImages } from '../api/pexels'
import ImageList from '../components/ImageList'

const HomeScreens = ({openSearch}) => {
    const [photos, setphotos] = useState([]);
    const [searchTerm, setsearchTerm] = useState('');


    const loadImages = async (searchTerm) => {
        const res = await getImages(searchTerm);
        console.log(res.headers);
        setphotos(res.data.photos);
    }

    useEffect(() => {
        loadImages();           
    }, [])

    const handleSearch = async () => {
        await loadImages(searchTerm)
    }
    return (

        <> 
        {openSearch &&(
            <View style={styles.searchSection}>
                <Input 
                leftIcon={{type:'feather',name:'search',color:'#FFF'}}
                placeholder='Search a term'
                style={styles.input}
                leftIconContainerStyle={styles.searchLeftIcon}
                inputContainerStyle={styles.searchInput}
                onChangeText={(value) => setsearchTerm(value)}
               />
                <Button title="Search" buttonStyle={styles.buttonSearch} onPress={() => handleSearch()}/>
            </View>
        )}

        <View style={styles.container}>
            <Text style={styles.totalResultText}>1000 resultados</Text>
            <ImageList photos={photos}/>
        </View>
        </>
        
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        alignContent: 'center',
        justifyContent: 'center'

    },
    totalResultText:{
        color: '#D0D0D0',
        textAlign:'right',
        width:"100%",
       
    },
    searchInput:{
        backgroundColor:'#2c292c',
        borderBottomWidth:0,
        paddingHorizontal:4,
        color: 'white'
    },
    searchSection:{
        backgroundColor:'#0D0D0D',
        width:'100%',
        paddingLeft:10,
        paddingRight:80,
        flex: 1/5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchLeftIcon: {
        paddingStart: 10,
        marginRight:7
    },
    input:{
        color: 'white'
    },
    buttonSearch:{
        backgroundColor: '#229783',
        marginBottom:27
    }
})

export default HomeScreens
