
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';

const RRPdf = () => {
  return (
    <Document>
<Page size="A4" >
    <View style={{ marginTop:"12px" ,marginLeft:"30px",display:"flex",justifyContent:"center",alignItems:"center" }}>
        <Image
            src="https://i.ibb.co/HqRBG9S/PNG-Richkid-Logo.png"
            style={{ width: '80px'}}
        />
        <Text style={{ fontSize:"14px",fontWeight:"bold" }}>
            Invoice No: 12345
        </Text>
    </View>
    {/* company info  */}
    <View>
      <Text> ABC COMPANY </Text>
      <Text> DHAKA BANGLADESH </Text>
      <Text> PHONE:000000 </Text>
      <Text>EMAIL:gg@mail.com </Text>
      <Text> www.ff.uk</Text>
    </View>
</Page>



      
    </Document>
  );
};

export default RRPdf;
