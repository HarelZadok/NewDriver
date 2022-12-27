import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {useRef} from "react";
import {get, ref, getDatabase, child} from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

let id, password;

export default function LoginPage({navigation})
{
    const passRef = useRef();

    return <View style={styles.container}>
        <View style={styles.header}>
            <Image source={require('../resources/CityBG.png')} style={styles.cityImage}/>
            <Image source={require('../resources/Car.png')} style={styles.carImage}/>
        </View>
        <View style={styles.body}>
            <Text style={styles.label}>ת"ז</Text>
            <TextInput onChangeText={(text) => {id = text}} onSubmitEditing={() => passRef.current.focus()} returnKeyType='next' blurOnSubmit={false} style={styles.input} maxLength={9} keyboardType='numeric'/>
            <Text style={styles.label}>סיסמא</Text>
            <TextInput secureTextEntry ref={passRef} onChangeText={text => password = text} style={styles.input}/>
            <TouchableOpacity style={styles.button} onPress={() => moveToMainPage(navigation)}>
                <Text style={{fontWeight: 'bold', fontSize: 20, color: '#183658'}}>המשך</Text>
            </TouchableOpacity>
        </View>
    </View>
}

const handleID = (text, setDisplay) => {
    id = text;
    if (!verifyIdentityNumber(text))
        setDisplay('flex');
    else
        setDisplay('none');
};

const verifyIdentityNumber = (id) => {
    if ((id.length !== 9) || (isNaN(id))) return false;
    let counter = 0, incNum;
    for (let i = 0; i < 9; i++) {
        incNum = Number(id.charAt(i));
        incNum *= (i % 2) + 1;
        if (incNum > 9) incNum -= 9;
        counter += incNum;
    }
    return (counter % 10 === 0);
}

const moveToMainPage = (navigation) =>
{
    const db = getDatabase();
    let msg = '0';

    get(child(ref(db), 'users/drivers/' + id)).then((snapshot) => {
        if (snapshot.exists()) {
            if (snapshot.val().password === password)
            {
                AsyncStorage.setItem('id', id).then(() => {
                    navigation.navigate('MainPage', {id: id});
                    msg = '';
                });
            }
            else
            {
                msg = 'סיסמא שגויה';
            }
        }
    }).then(() => {
        get(child(ref(db), 'users/passengers/' + id)).then((snapshot) => {
            if (snapshot.exists()) {
                if (snapshot.val().password === password) {
                    AsyncStorage.setItem('id', id).then(() => {
                        navigation.navigate('MainPage', {id: id});
                        msg = '';
                    });
                } else {
                    msg = 'סיסמא שגויה';
                }
            }
        }).then(() => {
            if (msg === '0')
                msg = 'משתמש לא קיים';
            if (msg !== '')
                alert(msg);
        });
    });
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: '15%',
    },
    body: {
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
    },
    carImage: {
        width: 100,
        height: 50,
        transform: [{scaleX: -1}],
        position: 'absolute',
        top: 83,
        left: 25,
        zIndex: 1
    },
    cityImage: {
        position: 'absolute',
        height: 120,
        width: '100%',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        zIndex: -1,
    },
    label: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 5,
        alignSelf: 'flex-end'
    },
    input: {
        height: 30,
        width: '100%',
        backgroundColor: '#eee',
        borderRadius: 6,
        padding: 5
    },
    button: {
        alignSelf: 'flex-start',
        marginVertical: 20
    },
});