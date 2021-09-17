import React, { useEffect, useState } from 'react';
import { View, Text, Image,StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button } from 'react-native-elements'
import * as WebBrowser from 'expo-web-browser';
import ImageList from '../components/ImageList';
import { getImages } from '../api/pexels';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const ImageScreen = ({ route }) => {
    const {image} = route.params;
    const [photos, setphotos] = useState([]);



    const loadImages = async () => {
        const res = await getImages();
        setphotos(res.data.photos);
    }

    useEffect(() => {
        loadImages();           
    }, []);

    

    const handlePress = async () => 
         await WebBrowser.openBrowserAsync(image.photographer_url);

    const downloadFile = async () => { 
        try {
            let fileUri = FileSystem.documentDirectory + image.id + ".jpeg";
            const { uri } = await FileSystem.downloadAsync(
                image.src.large2x,
                fileUri
              );
            saveFile(uri);

        } catch (error) {
            console.error(error);
        }
    }
    const saveFile = async (fileUri) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
    }
  };

    const handleDownload = () => {
        downloadFile();
    };

    return (
        <View style={styles.headerPhotographer}>
            <Image source={{ uri: image.src.large2x,height:350 }}/> 
            <View style={{
            display:'flex', 
            paddingVertical:18, 
            justifyContent:'space-between',
            flexDirection:'row',
            alignItems:'center',
            width:'100%'}}>
            <View style={{display:'flex',
             flexDirection:'row',
             alignItems:'center'}}>
                <Avatar title={image.photographer.split(' ').map(string => string[0]).join('').toUpperCase()} containerStyle={{backgroundColor: image.avg_color}} rounded />
                <TouchableOpacity onPress={handlePress}>
                    <Text style={styles.textPhotographer}>{image.photographer}</Text>
                </TouchableOpacity>
                
            </View>          
            <Button title='Download' buttonStyle={{backgroundColor:'#229783'}} onPress={() => handleDownload()}/>    
            </View> 
             <View>
               <ImageList photos={photos}/>  
            </View>                
        </View>
    );
};

const styles = StyleSheet.create({
    headerPhotographer:{
        backgroundColor:'#0D0D0D',
        flex:1,
        flexDirection:'column',
        padding:10,
    },
    textPhotographer:{
        color:'white',
        fontWeight:'bold',
        marginStart: 5,
        fontSize:16
    },
    
})

export default ImageScreen
