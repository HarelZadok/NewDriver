import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import {useEffect, useState} from "react";
import {get, ref, getDatabase, child} from "firebase/database";
import {getTypeById, Account} from "../classes/Account";

export default function MainPage({navigation, route})
{
    const [account, setAccount] = useState(new Account());

    useEffect(() => {
            getAccount(route.params.id, setAccount);
    }, []);

    return <View style={styles.container}>
        <View style={styles.header}>
            <Image source={require('../resources/CityBG.png')} style={styles.cityImage}/>
            <Text style={{fontWeight: 'bold', fontFamily: '',fontSize: 31, color: 'white', marginTop: 40, marginRight: 20}}>,{account.firstName}</Text>
            <Text style={{fontWeight: 'normal', fontSize: 31, color: 'white', marginRight: 20}}>כיף שחזרת</Text>
        </View>
        <Image style={styles.carImage} source={require('../resources/Car.png')}/>
        <View style={styles.body}>
            <TouchableOpacity style={styles.button}>
                <View>
                    <Text style={{fontWeight: 'bold', fontSize: 30, color: '#000'}}>יאללה</Text>
                    <Text style={{fontSize: 30, color: '#000'}}>נוסעים!</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.footer}>
            <View style={{flexDirection: 'row-reverse', backgroundColor: '#fff', width: '70%', height: 55, borderRadius: 100, justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 20, paddingBottom: 13}}>
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
        backgroundColor: '#58b69a',
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
        height: 280,
        width: '100%',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        zIndex: -1,
    }
});