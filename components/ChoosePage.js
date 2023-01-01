import {View, Text, TouchableOpacity, Image, StyleSheet, StatusBar} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChoosePage({navigation}) {
    return <View style={styles.container}>
        <View style={styles.header}>
            <Image source={require('../resources/CityBG.png')} style={styles.cityImage}/>
            <View style={styles.newDriverView}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>נהג חדש</Text>
            </View>
        </View>
        <Image style={styles.carImage} source={require('../resources/Car.png')}/>
        <View style={styles.body}>
            <TouchableOpacity style={[styles.button, {marginTop: 50}]} onPress={() => moveToRegisterPage(navigation, 'drivers')}>
                <Text style={{fontWeight: 'bold', fontSize: 20, color: '#183658'}}>המשך בתור נהג חדש</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => moveToRegisterPage(navigation, 'passengers')}>
                <Text style={{fontWeight: 'bold', fontSize: 20, color: '#183658'}}>המשך בתור מלווה</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => moveToLoginPage(navigation)}>
                <Text style={{fontWeight: 'bold', fontSize: 20, color: '#183658'}}>התחבר למשתמש רשום</Text>
            </TouchableOpacity>
        </View>
    </View>
}

const moveToRegisterPage = async (navigation, type) => {
    await AsyncStorage.getItem('id').then((value) => {
        if (value !== null) {
            navigation.navigate('MainPage', {id: value});
        } else {
            navigation.navigate('RegisterPage', {type});
        }
    });
}

const moveToLoginPage = async (navigation) => {
    await AsyncStorage.getItem('id').then((value) => {
        if (value !== null) {
            navigation.navigate('MainPage', {id: value});
        } else {
            navigation.navigate('LoginPage');
        }
    });
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#183658',
        height: 280,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        alignItems: 'flex-end',
    },
    body: {
        flex: 1,
        height: 'auto',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    newDriverView: {
        backgroundColor: '#e9ba00',
        height: 60,
        width: 150,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000',
        borderWidth: 3,
        marginRight: 20,
        marginTop: (StatusBar.currentHeight !== null? StatusBar.currentHeight : 40) + 20,
    },
    button: {
        backgroundColor: '#eee',
        padding: 20,
        marginTop: 20,
        width: "90%",
        height: 70,
        borderWidth: 1,
        borderColor: '#183658',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    carImage: {
        height: 100,
        width: 200,
        position: 'absolute',
        top: 205,
        bottom: 0,
        left: 10,
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