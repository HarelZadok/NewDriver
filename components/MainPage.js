import {View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, StatusBar} from "react-native";
import {useEffect, useState} from "react";
import {get, ref, getDatabase, child} from "firebase/database";
import {getTypeById, Account} from "../classes/Account";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MainPage({navigation, route})
{
    const [account, setAccount] = useState(new Account());

    useEffect(() => {
            getAccount(route.params.id, setAccount);
    }, []);

    return <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={{position: 'absolute', left: 10, top: 30}} onPress={() => logout(navigation)}>
                <Text style={{color: '#fff'}}>Log out</Text>
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontFamily: '', fontSize: 31, color: 'white', marginTop: (StatusBar.currentHeight !== null? StatusBar.currentHeight : 40) + 10, marginRight: 20, zIndex: 1}}>{account.firstName},</Text>
            <Text style={{fontWeight: 'normal', fontSize: 31, color: 'white', marginRight: 20, zIndex: 1}}>כיף שחזרת</Text>
        </View>
        <Image source={require('../resources/Img1.png')} style={styles.cityImage}/>
        <View style={styles.body}>
            <TouchableOpacity style={styles.button}>
                <ImageBackground source={require('../resources/DriveBackgroundButton.png')} style={styles.button}>
                    <Text style={{fontWeight: 'bold', fontSize: 30, color: '#000'}}>יאללה</Text>
                    <Text style={{fontSize: 30, color: '#000'}}>נוסעים!</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
        <View style={styles.footer}>
            <View style={{flexDirection: 'row-reverse', backgroundColor: '#eee', width: '70%', height: 55, borderRadius: 100, justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 20, paddingBottom: 13}}>
                <TouchableOpacity>
                    <Text style={{fontSize: 12, color: '#777', fontWeight: 'bold'}}>בית</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{fontSize: 12, color: '#777'}}>מידע</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{fontSize: 12, color: '#777'}}>נסיעות</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
}

async function logout(navigation)
{
    AsyncStorage.removeItem('id').then(() => {
        navigation.navigate('ChoosePage');
    });
}

async function getAccount(id, setAccount) {
    const db = getDatabase();

    let type = await getTypeById(id);
    type += 's';

    get(child(ref(db), `users/${type}/${id}`)).then((snapshot) => {
        if (snapshot.exists()) {
            setAccount(snapshot.val());
        } else {
            console.log("No data available");
        }
    });
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        width: '100%',
        height: 280,
        backgroundColor: '#183658',
        alignItems: 'flex-end',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    body: {
        width: '100%',
        height: '55%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        height: 160,
        width: 160,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    carImage: {
        height: 120,
        width: 240,
        position: 'absolute',
        top: 190,
        bottom: '65%',
        left: 50,
        right: 0,
        transform: [{scaleX: -1}]
    },
    cityImage: {
        position: 'absolute',
        resizeMode: 'contain',
        left: 0,
        right: 0,
        top: 140,
        height: 150,
        width: 'auto',
        zIndex: 1
    }
});