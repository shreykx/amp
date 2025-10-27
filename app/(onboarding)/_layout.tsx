import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../components/CustomHeader";
export default function OnBoardingLayout() {
    return (<SafeAreaView style={{
        flex : 1,
        backgroundColor : 'white'
    }}>
        <CustomHeader showMenuIcon={false}/>
        

    </SafeAreaView>)
}