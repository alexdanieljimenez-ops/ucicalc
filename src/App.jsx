import { useState, useMemo } from "react";

const ACCENT="#0891B2",ACCENT_LIGHT="#E0F2FE",ACCENT_MID="#0E7490";
const T={bg:"#F2F2F7",surface:"#FFFFFF",surface2:"#F2F2F7",card:"#FFFFFF",border:"#E5E5EA",label:"#8E8E93",text:"#1C1C1E",sub:"#3C3C43",accent:ACCENT,green:"#34C759",yellow:"#FF9500",red:"#FF3B30"};
const SEM={green:{bg:"#F0FBF3",border:"#34C75930",dot:"#34C759",txt:"#1A8C3A",badge:"#E8F8EC",badgeTxt:"#1A8C3A",label:"Normal"},yellow:{bg:"#FFF8F0",border:"#FF950030",dot:"#FF9500",txt:"#CC7A00",badge:"#FFF0DB",badgeTxt:"#CC7A00",label:"Límite"},red:{bg:"#FFF0EF",border:"#FF3B3030",dot:"#FF3B30",txt:"#CC2F26",badge:"#FFE8E7",badgeTxt:"#CC2F26",label:"Alterado"},gray:{bg:"#FAFAFA",border:"#E5E5EA",dot:"#C7C7CC",txt:"#8E8E93",badge:"#F2F2F7",badgeTxt:"#8E8E93",label:"—"}};
const r=(v,d=1)=>(v===null||v===undefined||isNaN(v)?null:+parseFloat(v).toFixed(d));
const n=v=>(v===""||v===null||v===undefined?null:parseFloat(v));

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
function Inp({label,unit,value,onChange,hint,placeholder="—"}){
  const[focused,setFocused]=useState(false);
  return(<div style={{marginBottom:2}}>
    <div style={{fontSize:11,fontWeight:600,color:T.label,letterSpacing:"0.02em",marginBottom:4,textTransform:"uppercase"}}>{label}</div>
    <div style={{display:"flex",alignItems:"center",background:T.surface,border:`1.5px solid ${focused?ACCENT:T.border}`,borderRadius:10,padding:"10px 14px",transition:"all 0.15s",boxShadow:focused?`0 0 0 3px ${ACCENT}18`:"none"}}>
      <input type="number" value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} style={{background:"transparent",color:T.text,fontSize:15,width:"100%",outline:"none",border:"none",fontWeight:"500",MozAppearance:"textfield"}}/>
      {unit&&<span style={{fontSize:13,color:T.label,marginLeft:4,whiteSpace:"nowrap"}}>{unit}</span>}
    </div>
    {hint&&<div style={{fontSize:11,color:T.label,marginTop:3,paddingLeft:2}}>{hint}</div>}
  </div>);
}
function Sel({label,value,onChange,options}){
  return(<div style={{marginBottom:2}}>
    <div style={{fontSize:11,fontWeight:600,color:T.label,letterSpacing:"0.02em",marginBottom:4,textTransform:"uppercase"}}>{label}</div>
    <select value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",background:T.surface,color:T.text,border:`1.5px solid ${T.border}`,borderRadius:10,padding:"10px 14px",fontSize:15,outline:"none",fontWeight:"500",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238E8E93' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 14px center"}}>
      {options.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  </div>);
}
function Row({label,value,unit,color="gray",normal,noStatus}){
  const s=SEM[color];
  return(<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 14px",background:s.bg,borderRadius:10,border:`1px solid ${s.border}`,marginBottom:6}}>
    <div style={{display:"flex",alignItems:"center",gap:10,flex:1,minWidth:0}}>
      {!noStatus&&<div style={{width:8,height:8,borderRadius:"50%",background:s.dot,flexShrink:0}}/>}
      <div style={{minWidth:0}}>
        <div style={{fontSize:13,fontWeight:500,color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{label}</div>
        {normal&&<div style={{fontSize:11,color:T.label,marginTop:1}}>{normal}</div>}
      </div>
    </div>
    <div style={{display:"flex",alignItems:"center",gap:8,marginLeft:8,flexShrink:0}}>
      {!noStatus&&value!==null&&<span style={{fontSize:11,fontWeight:600,color:s.badgeTxt,background:s.badge,padding:"2px 8px",borderRadius:20,whiteSpace:"nowrap"}}>{s.label}</span>}
      <span style={{fontSize:15,fontWeight:600,color:T.text,whiteSpace:"nowrap"}}>{value!==null&&value!==undefined?<>{value}{unit&&<span style={{fontSize:12,color:T.label,marginLeft:3}}>{unit}</span>}</>:<span style={{color:T.label}}>—</span>}</span>
    </div>
  </div>);
}
function Card({children,title,icon}){
  return(<div style={{background:T.card,borderRadius:16,overflow:"hidden",marginBottom:14,boxShadow:"0 1px 3px rgba(0,0,0,0.07)"}}>
    {title&&<div style={{padding:"14px 16px 10px",display:"flex",alignItems:"center",gap:8,borderBottom:`1px solid ${T.border}`}}>{icon&&<span style={{fontSize:17}}>{icon}</span>}<span style={{fontSize:13,fontWeight:700,color:ACCENT,letterSpacing:"0.01em"}}>{title}</span></div>}
    <div style={{padding:16}}>{children}</div>
  </div>);
}
function SL({text}){return<div style={{fontSize:11,fontWeight:600,color:T.label,letterSpacing:"0.04em",textTransform:"uppercase",padding:"4px 4px 8px"}}>{text}</div>;}
function G2({children}){return<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{children}</div>;}
function BM({label,value,unit,color}){
  const col=color||ACCENT;
  return(<div style={{background:T.surface2,borderRadius:12,padding:"14px 12px",textAlign:"center"}}>
    <div style={{fontSize:11,fontWeight:600,color:T.label,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.03em"}}>{label}</div>
    <div style={{fontSize:22,fontWeight:700,color:col,lineHeight:1}}>{value||"—"}</div>
    {unit&&<div style={{fontSize:11,color:T.label,marginTop:3}}>{unit}</div>}
  </div>);
}
function VT({value,onChange}){
  return(<div style={{display:"flex",background:"#E5E5EA",borderRadius:10,padding:3,gap:2}}>
    {[{v:"datos",l:"📋  Datos"},{v:"resultados",l:"📊  Resultados"}].map(o=>(
      <button key={o.v} onClick={()=>onChange(o.v)} style={{flex:1,padding:"7px 0",borderRadius:8,fontSize:13,fontWeight:600,border:"none",cursor:"pointer",transition:"all 0.18s",background:value===o.v?T.surface:"transparent",color:value===o.v?T.text:T.label,boxShadow:value===o.v?"0 1px 4px rgba(0,0,0,0.13)":"none"}}>{o.l}</button>
    ))}
  </div>);
}
function Alrt({color,icon,title,body}){
  const c={red:{bg:"#FFF0EF",border:"#FF3B3040",title:"#CC2F26",body:"#6B6B6B"},yellow:{bg:"#FFF8F0",border:"#FF950040",title:"#CC7A00",body:"#6B6B6B"},green:{bg:"#F0FBF3",border:"#34C75940",title:"#1A8C3A",body:"#6B6B6B"}}[color]||{bg:"#F2F2F7",border:"#E5E5EA",title:T.label,body:T.label};
  return(<div style={{padding:"12px 14px",borderRadius:12,background:c.bg,border:`1px solid ${c.border}`,marginBottom:8}}><div style={{fontSize:13,fontWeight:600,color:c.title,marginBottom:body?3:0}}>{icon} {title}</div>{body&&<div style={{fontSize:12,color:c.body,lineHeight:1.5}}>{body}</div>}</div>);
}
function IBox({text}){return<div style={{padding:"9px 12px",background:ACCENT_LIGHT,borderRadius:10,fontSize:12,color:ACCENT_MID,marginTop:6}}>{text}</div>;}
function Div(){return<div style={{height:1,background:T.border,margin:"12px 0"}}/>;}

// ─── CALCS ────────────────────────────────────────────────────────────────────
function useCalcs(v){
  return useMemo(()=>{
    const fc=n(v.fc),pas=n(v.pas),pad=n(v.pad),spo2=n(v.spo2),fio2=n(v.fio2_basic)||21;
    const alt=n(v.altura),peso=n(v.peso),hb=n(v.hb),sao2=n(v.sao2)||spo2,pao2=n(v.pao2);
    const svo2=n(v.svo2),pvco2=n(v.pvco2),pvo2=n(v.pvo2),paco2=n(v.paco2);
    const lac1=n(v.lactato1),lac2=n(v.lactato2),dtsvi=n(v.dtsvi),vti=n(v.vti),epss=n(v.epss);
    const fac_dd=n(v.fac_dd),fac_ds=n(v.fac_ds),cfa_fd=n(v.cfa_fd),cfa_fs=n(v.cfa_fs);
    const PAM=pas&&pad?r((pas+2*pad)/3,1):null;
    const PP=pas&&pad?r(pas-pad,0):null;
    const iShock=fc&&pas?r(fc/pas,2):null;
    const SaFi=spo2?r(spo2/(fio2/100),0):null;
    const BSA=alt&&peso?r(Math.sqrt(alt*peso/3600),2):null;
    const ATSVI_eco=dtsvi?r((dtsvi**2)*0.785,2):null;
    const DTSVI_est=BSA?r(5.7*BSA+12.1,1):null;
    const ATSVI_est=DTSVI_est?r(((DTSVI_est/10)**2)*0.785,2):null;
    const ATSVI=ATSVI_eco||ATSVI_est;
    const atsvi_method=ATSVI_eco?"medido":ATSVI_est?"estimado":null;
    const gc_dir=n(v.gc_directo);
    const GC=gc_dir||(vti&&ATSVI&&fc?r(vti*ATSVI*fc/1000,2):null);
    const gc_fuente=gc_dir?"directo/ECMO":(!gc_dir&&vti)?"eco VTI":null;
    const IC=GC&&BSA?r(GC/BSA,2):null;
    const FEVI_epss=epss!==null?r(Math.max(0,Math.min(100,75.5-2.5*epss)),1):null;
    const FEVI_simp=n(v.fevi_simpson);
    const FAC=fac_dd&&fac_ds?r((fac_dd-fac_ds)/fac_dd*100,1):null;
    const CFA=cfa_fd&&cfa_fs?r((cfa_fd-cfa_fs)/cfa_fd*100,1):null;
    const vci_max=n(v.vci_max),vci_min=n(v.vci_min),vci_modo=v.vci_modo||"espontaneo";
    const IC_VCI=vci_max&&vci_min?r((vci_max-vci_min)/vci_max*100,1):null;
    const ID_VCI=vci_max&&vci_min?r((vci_max-vci_min)/vci_min*100,1):null;
    const DELTA_VCI=vci_max&&vci_min?r(vci_max-vci_min,1):null;
    let PVC_est=null,pvc_est_label=null;
    if(vci_modo==="espontaneo"&&vci_max!==null&&IC_VCI!==null){
      const grande=vci_max>21,colapsa=IC_VCI>50;
      if(!grande&&colapsa){PVC_est=3;pvc_est_label="Baja (0–5)";}
      else if(grande&&!colapsa){PVC_est=15;pvc_est_label="Alta (10–20)";}
      else{PVC_est=8;pvc_est_label="Intermedia (5–10)";}
    }
    const pvc_efectiva=n(v.pvc)??PVC_est??0;
    const pvc_fuente=n(v.pvc)!==null?"directa":PVC_est!==null?"estimada VCI":"asumida 0";
    const CaO2=hb&&sao2?r(hb*1.36*(sao2/100)+(pao2||0)*0.0031,2):null;
    const CvO2=hb&&svo2?r(hb*1.36*(svo2/100)+(pvo2||0)*0.0031,2):null;
    const DifCaV=CaO2&&CvO2?r(CaO2-CvO2,2):null;
    const DO2I=IC&&CaO2?r(IC*CaO2*10,0):null;
    const VO2I=IC&&DifCaV?r(IC*DifCaV*10,0):null;
    const DO2=GC&&CaO2&&!IC?r(GC*CaO2*10,0):null;
    const VO2=GC&&DifCaV&&!IC?r(GC*DifCaV*10,0):null;
    const O2ER=CaO2&&CvO2?r((CaO2-CvO2)/CaO2*100,1):null;
    const DeltaCO2=pvco2&&paco2?r(pvco2-paco2,1):null;
    const DepLac=lac1&&lac2?r((lac1-lac2)/lac1*100,1):null;
    const RVS=PAM&&GC?r((PAM-pvc_efectiva)*79.92/GC,1):null;
    const CPO=PAM&&GC?r(PAM*GC/451,2):null;
    return{PAM,PP,iShock,SaFi,BSA,ATSVI,ATSVI_eco,ATSVI_est,DTSVI_est,atsvi_method,GC,gc_fuente,IC,FEVI_epss,FEVI_simp,FAC,CFA,CaO2,CvO2,DifCaV,DO2I,VO2I,DO2,VO2,O2ER,DeltaCO2,DepLac,RVS,CPO,IC_VCI,ID_VCI,DELTA_VCI,PVC_est,pvc_est_label,pvc_efectiva,pvc_fuente,vci_max,vci_min,vci_modo};
  },[v]);
}

// ─── HEMO INPUTS ─────────────────────────────────────────────────────────────
function HemoInputs({v,set}){
  return(<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
    <div>
      <SL text="Signos Vitales"/><Card><G2><Inp label="FC" unit="lpm" value={v.fc} onChange={set("fc")}/><Inp label="SpO₂" unit="%" value={v.spo2} onChange={set("spo2")}/><Inp label="PAS" unit="mmHg" value={v.pas} onChange={set("pas")}/><Inp label="PAD" unit="mmHg" value={v.pad} onChange={set("pad")}/><Inp label="FiO₂" unit="%" value={v.fio2_basic} onChange={set("fio2_basic")} hint="Aire ambiental = 21%"/></G2></Card>
      <SL text="Gasto Cardíaco Directo"/>
      <Card>
        <Inp label="GC directo (ECMO / termodilución / Fick)" unit="L/min" value={v.gc_directo} onChange={set("gc_directo")} hint="Opcional — tiene prioridad sobre VTI eco"/>
        {v.gc_directo&&<div style={{marginTop:8,padding:"8px 12px",background:"#E0F2FE",borderRadius:8,fontSize:12,color:"#0E7490",fontWeight:600}}>✓ GC directo activo — VTI eco ignorado para cálculos</div>}
      </Card>
      <SL text="Antropometría"/><Card><G2><Inp label="Talla" unit="cm" value={v.altura} onChange={set("altura")}/><Inp label="Peso" unit="kg" value={v.peso} onChange={set("peso")}/></G2></Card>
      <SL text="Gasometría Arterial"/><Card><G2><Inp label="PaO₂" unit="mmHg" value={v.pao2} onChange={set("pao2")}/><Inp label="PaCO₂" unit="mmHg" value={v.paco2} onChange={set("paco2")}/><Inp label="SaO₂" unit="%" value={v.sao2} onChange={set("sao2")} hint="Si difiere de SpO₂"/><Inp label="HCO₃" unit="mEq/L" value={v.hco3a} onChange={set("hco3a")}/></G2></Card>
      <SL text="Gasometría Venosa"/><Card><G2><Inp label="SvO₂ / ScvO₂" unit="%" value={v.svo2} onChange={set("svo2")} hint="VN >65% / >70%"/><Inp label="PvCO₂" unit="mmHg" value={v.pvco2} onChange={set("pvco2")}/><Inp label="PvO₂" unit="mmHg" value={v.pvo2} onChange={set("pvo2")}/></G2></Card>
      <SL text="Labs y CVC"/><Card><G2><Inp label="Hb" unit="g/dL" value={v.hb} onChange={set("hb")}/><Inp label="PVC directa" unit="mmHg" value={v.pvc} onChange={set("pvc")} hint="Si no hay, se estima por VCI"/><Inp label="Lactato inicial" unit="mmol/L" value={v.lactato1} onChange={set("lactato1")}/><Inp label="Lactato 2h" unit="mmol/L" value={v.lactato2} onChange={set("lactato2")}/></G2></Card>
    </div>
    <div>
      <SL text="ECO — VTI y Gasto Cardíaco"/><Card><G2><Inp label="D TSVI" unit="cm" value={v.dtsvi} onChange={set("dtsvi")} hint="ATSVI = D²×0.785"/><Inp label="VTI TSVI" unit="cm" value={v.vti} onChange={set("vti")} hint="Normal 18–22 cm"/></G2><IBox text="Sin D TSVI → se estima por 5.7×SC+12.1 (J Am Soc Echocardiogr 2009)"/></Card>
      <SL text="ECO — Función Sistólica VI"/><Card>
        <G2><Inp label="E/Septum (EPSS)" unit="mm" value={v.epss} onChange={set("epss")} hint="VN <7 mm"/><Inp label="FEVI Simpson's" unit="%" value={v.fevi_simpson} onChange={set("fevi_simpson")} hint="Del ecógrafo"/></G2>
        <Div/><div style={{fontSize:12,fontWeight:600,color:T.label,marginBottom:8}}>FAC — Fracción de Acortamiento (Modo M)</div>
        <G2><Inp label="DFDVI" unit="mm" value={v.fac_dd} onChange={set("fac_dd")} hint="VN <60 mm"/><Inp label="DFSVI" unit="mm" value={v.fac_ds} onChange={set("fac_ds")}/></G2>
        <Div/><div style={{fontSize:12,fontWeight:600,color:T.label,marginBottom:8}}>CFA — Cambio Fraccional de Área (Apical 4C)</div>
        <G2><Inp label="Área FD VI" unit="cm²" value={v.cfa_fd} onChange={set("cfa_fd")} hint="Trazado FD"/><Inp label="Área FS VI" unit="cm²" value={v.cfa_fs} onChange={set("cfa_fs")} hint="Trazado FS"/></G2>
      </Card>
      <SL text="ECO — VD"/><Card><G2><Inp label="MAPSE lateral" unit="mm" value={v.mapse} onChange={set("mapse")} hint="VN >16 mm"/><Inp label="TAPSE" unit="mm" value={v.tapse} onChange={set("tapse")} hint="VN >17 mm"/><Inp label="Relación VD/VI" value={v.rvlv} onChange={set("rvlv")} hint="VN <0.6"/></G2></Card>
      <SL text="VCI — Precarga y PVC estimada"/><Card>
        <Sel label="Modo respiratorio" value={v.vci_modo} onChange={set("vci_modo")} options={[{v:"espontaneo",l:"🫁 Respiración espontánea"},{v:"vm_invasiva",l:"⚙️ VM invasiva (presión positiva)"},{v:"vni",l:"😷 VNI / CPAP"}]}/>
        <Div/>
        <G2><Inp label="VCI máximo (espiración)" unit="mm" value={v.vci_max} onChange={set("vci_max")} hint={v.vci_modo==="vm_invasiva"?"Inspiración en VM":"En espiración"}/><Inp label="VCI mínimo (inspiración)" unit="mm" value={v.vci_min} onChange={set("vci_min")} hint={v.vci_modo==="vm_invasiva"?"Espiración en VM":"Con sniff"}/></G2>
        {v.vci_modo==="vm_invasiva"&&<div style={{marginTop:10,padding:"9px 12px",background:"#FFF8F0",border:"1px solid #FF950040",borderRadius:10,fontSize:12,color:"#CC7A00"}}>⚠️ VM invasiva: Tabla ASE de PVC no válida — usar línea central</div>}
        {v.vci_modo==="vni"&&<div style={{marginTop:10,padding:"9px 12px",background:"#FFF8F0",border:"1px solid #FF950040",borderRadius:10,fontSize:12,color:"#CC7A00"}}>⚠️ VNI/CPAP: comportamiento mixto — interpretar con cautela</div>}
      </Card>
    </div>
  </div>);
}

// ─── HEMO RESULTS ─────────────────────────────────────────────────────────────
function HemoResults({c,v}){
  const{PAM,PP,iShock,SaFi,BSA,ATSVI,ATSVI_eco,DTSVI_est,atsvi_method,GC,gc_fuente,IC,FEVI_epss,FEVI_simp,FAC,CFA,CaO2,CvO2,DifCaV,DO2I,VO2I,DO2,VO2,O2ER,DeltaCO2,DepLac,RVS,CPO,IC_VCI,ID_VCI,DELTA_VCI,PVC_est,pvc_est_label,pvc_fuente,vci_max,vci_min,vci_modo}=c;
  const alerts=[];
  if(IC!==null&&IC<2.2)alerts.push({color:"red",icon:"⚠️",title:`IC bajo — ${IC} L/min/m²`,body:"Umbral shock cardiogénico · Evaluar inotrópico"});
  if(CPO!==null&&CPO<0.6)alerts.push({color:"red",icon:"⚠️",title:`CPO bajo — ${CPO} W`,body:"Predictor independiente mortalidad en shock"});
  if(DeltaCO2!==null&&DeltaCO2>=6)alerts.push({color:"yellow",icon:"⚠️",title:`ΔCO₂ elevado — ${DeltaCO2} mmHg`,body:"Flujo insuficiente · Perfusión tisular comprometida"});
  if(O2ER!==null&&O2ER>30)alerts.push({color:"yellow",icon:"⚠️",title:`Extracción O₂ alta — ${O2ER}%`,body:"Compensación periférica activa"});
  if(DepLac!==null&&DepLac<10)alerts.push({color:"yellow",icon:"⚠️",title:`Depuración lactato — ${DepLac}%`,body:"Meta >10% en 2h · Reevaluar resucitación"});
  if(RVS!==null&&RVS<750)alerts.push({color:"yellow",icon:"⚠️",title:`RVS baja — ${RVS} WU`,body:"Perfil distributivo · Evaluar vasopresor"});
  if(n(v.tapse)!==null&&n(v.tapse)<17)alerts.push({color:"yellow",icon:"⚠️",title:`Disfunción VD — TAPSE ${v.tapse}mm`,body:"Evaluar cor pulmonale / TEP"});
  if(IC!==null&&IC>=2.5&&CPO!==null&&CPO>=0.6&&(O2ER===null||O2ER<=30))alerts.push({color:"green",icon:"✅",title:"Hemodinamia compensada",body:"IC y CPO dentro de metas"});
  return(<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
    <div>
      <SL text="Macrohemodinamia"/><Card>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <BM label="PAM" value={PAM} unit="mmHg" color={!PAM?T.label:PAM>=65?T.green:PAM>=60?T.yellow:T.red}/>
          <BM label="Presión de Pulso" value={PP} unit="mmHg" color={!PP?T.label:PP>=40?T.green:PP>=25?T.yellow:T.red}/>
          <BM label="Índice de Shock" value={iShock} color={!iShock?T.label:iShock<0.7?T.green:iShock<1.0?T.yellow:T.red}/>
          <BM label="SaFi" value={SaFi} color={!SaFi?T.label:SaFi>=315?T.green:SaFi>=235?T.yellow:T.red}/>
        </div>
        {BSA&&<div style={{marginTop:10,padding:"10px 14px",background:T.surface2,borderRadius:10,display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:8}}>
          <div style={{textAlign:"center"}}><div style={{fontSize:11,color:T.label,marginBottom:2}}>ASC</div><div style={{fontSize:16,fontWeight:700,color:ACCENT}}>{BSA} m²</div></div>
          {ATSVI&&<div style={{textAlign:"center"}}><div style={{fontSize:11,color:T.label,marginBottom:2}}>ATSVI ({atsvi_method})</div><div style={{fontSize:16,fontWeight:700,color:atsvi_method==="estimado"?T.yellow:ACCENT}}>{ATSVI} cm²</div></div>}
          {DTSVI_est&&!ATSVI_eco&&<div style={{textAlign:"center"}}><div style={{fontSize:11,color:T.label,marginBottom:2}}>D TSVI est.</div><div style={{fontSize:16,fontWeight:700,color:T.yellow}}>{DTSVI_est} mm</div></div>}
        </div>}
        {atsvi_method==="estimado"&&<IBox text="ATSVI estimada por 5.7×SC+12.1 — medir por eco cuando sea posible"/>}
      </Card>
      {(IC_VCI!==null||ID_VCI!==null)&&<>
        <SL text="VCI — Índices y PVC"/><Card>
          <div style={{padding:"6px 10px",background:ACCENT_LIGHT,borderRadius:8,fontSize:11,fontWeight:600,color:ACCENT_MID,marginBottom:10}}>
            {vci_modo==="espontaneo"&&"🫁 Resp. espontánea — Índice de Colapsabilidad"}
            {vci_modo==="vm_invasiva"&&"⚙️ VM invasiva — Índice de Distensibilidad"}
            {vci_modo==="vni"&&"😷 VNI/CPAP — Interpretar con cautela"}
          </div>
          {vci_max!==null&&<Row label="VCI máximo" value={`${vci_max} mm`} color={vci_max>21?"red":"green"} normal="Normal ≤21 mm"/>}
          {vci_min!==null&&<Row label="VCI mínimo" value={`${vci_min} mm`} noStatus/>}
          {DELTA_VCI!==null&&<Row label="ΔVCI (variabilidad)" value={`${DELTA_VCI} mm`} color={DELTA_VCI>=2.9?"green":"red"} normal="Respondedor ≥2.9 mm"/>}
          {vci_modo==="espontaneo"&&IC_VCI!==null&&<Row label="IC-VCI (Colapsabilidad)" value={`${IC_VCI}%`} color={IC_VCI>=50?"green":IC_VCI>=35?"yellow":"red"} normal="Respondedor >50%"/>}
          {vci_modo==="vm_invasiva"&&ID_VCI!==null&&<Row label="ID-VCI (Distensibilidad)" value={`${ID_VCI}%`} color={ID_VCI>=18?"green":ID_VCI>=12?"yellow":"red"} normal="Respondedor >18%"/>}
          {vci_modo==="vni"&&IC_VCI!==null&&<Row label="IC-VCI (cautela)" value={`${IC_VCI}%`} color="yellow" normal="Interpretar con contexto"/>}
          {vci_modo==="espontaneo"&&PVC_est!==null&&<div style={{marginTop:8,padding:"12px 14px",background:PVC_est<=3?"#F0FBF3":PVC_est>=15?"#FFF0EF":"#FFF8F0",borderRadius:10,border:`1px solid ${PVC_est<=3?"#34C75940":PVC_est>=15?"#FF3B3040":"#FF950040"}`}}>
            <div style={{fontSize:11,fontWeight:600,color:T.label,marginBottom:4}}>PVC ESTIMADA — Tabla ASE</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:22,fontWeight:800,color:PVC_est<=3?T.green:PVC_est>=15?T.red:T.yellow}}>{PVC_est} mmHg</div>
              <div style={{fontSize:12,fontWeight:600,color:T.label}}>{pvc_est_label}</div>
            </div>
            <div style={{fontSize:11,color:T.label,marginTop:4}}>Fuente PVC en RVS: {pvc_fuente}</div>
          </div>}
        </Card>
      </>}
      {alerts.length>0&&<><SL text="Interpretación"/>{alerts.map((a,i)=><Alrt key={i} {...a}/>)}</>}
    </div>
    <div>
      {(GC||IC||FEVI_epss!==null||FEVI_simp!==null||FAC!==null||CFA!==null)&&<>
        <SL text="ECO — Función Sistólica"/><Card>
          {(GC||IC)&&<div style={{marginBottom:10}}>
            {gc_fuente&&<div style={{marginBottom:8,padding:"6px 10px",background:gc_fuente==="directo/ECMO"?"#FFF0F5":"#E0F2FE",borderRadius:8,fontSize:11,fontWeight:700,color:gc_fuente==="directo/ECMO"?"#C4004D":"#0E7490"}}>
              {gc_fuente==="directo/ECMO"?"⚙️ GC directo / ECMO":"🫀 GC por eco VTI"}
            </div>}
            <G2>{GC&&<BM label="Gasto Cardíaco" value={GC} unit="L/min" color={GC>=4?T.green:GC>=3?T.yellow:T.red}/>}{IC&&<BM label="Índice Cardíaco" value={IC} unit="L/min/m²" color={IC>=2.5?T.green:IC>=2.2?T.yellow:T.red}/>}</G2>
          </div>}
          {FEVI_epss!==null&&<Row label="FEVI por E/Septum" value={FEVI_epss} unit="%" color={FEVI_epss>=50?"green":FEVI_epss>=35?"yellow":"red"} normal="Meta ≥50%"/>}
          {FEVI_simp!==null&&<Row label="FEVI Simpson's" value={FEVI_simp} unit="%" color={FEVI_simp>=50?"green":FEVI_simp>=35?"yellow":"red"} normal="Meta ≥50%"/>}
          {FAC!==null&&<Row label="FAC — Fracción de Acortamiento" value={FAC} unit="%" color={FAC>=28?"green":FAC>=20?"yellow":"red"} normal="VN >28%"/>}
          {CFA!==null&&<Row label="CFA — Cambio Fraccional de Área" value={CFA} unit="%" color={CFA>=40?"green":CFA>=30?"yellow":"red"} normal="VN >40%"/>}
          {n(v.mapse)!==null&&<Row label="MAPSE lateral" value={n(v.mapse)} unit="mm" color={n(v.mapse)>=16?"green":n(v.mapse)>=10?"yellow":"red"} normal="VN >16 mm"/>}
          {n(v.tapse)!==null&&<Row label="TAPSE (VD)" value={n(v.tapse)} unit="mm" color={n(v.tapse)>=17?"green":n(v.tapse)>=14?"yellow":"red"} normal="VN >17 mm"/>}
          {n(v.rvlv)!==null&&<Row label="Relación VD/VI" value={n(v.rvlv)} color={n(v.rvlv)<0.6?"green":n(v.rvlv)<1.0?"yellow":"red"} normal="VN <0.6"/>}
        </Card>
      </>}
      {(CaO2||DO2I||VO2I||DO2||VO2||O2ER||DeltaCO2||RVS||CPO)&&<>
        <SL text="Microhemodinamia"/><Card>
          {CaO2!==null&&<Row label="CaO₂" value={CaO2} unit="mL/dL" color={CaO2>=17?"green":CaO2>=14?"yellow":"red"} normal="17–20"/>}
          {CvO2!==null&&<Row label="CvO₂" value={CvO2} unit="mL/dL" color={CvO2>=12?"green":CvO2>=10?"yellow":"red"} normal="12–15"/>}
          {DifCaV!==null&&<Row label="Dif Ca–Cv O₂" value={DifCaV} unit="mL/dL" color={DifCaV>=4&&DifCaV<=5?"green":"yellow"} normal="4–5"/>}
          {DO2I!==null&&<Row label="DO₂I (aporte O₂)" value={DO2I} unit="mL/min/m²" color={DO2I>=550?"green":DO2I>=400?"yellow":"red"} normal="550–650"/>}
          {VO2I!==null&&<Row label="VO₂I (consumo O₂)" value={VO2I} unit="mL/min/m²" color={VO2I>=115&&VO2I<=165?"green":"yellow"} normal="115–165"/>}{DO2!==null&&<Row label="DO₂ (aporte O₂)" value={DO2} unit="mL/min" color={DO2>=900?"green":DO2>=600?"yellow":"red"} normal="900–1100"/>}{VO2!==null&&<Row label="VO₂ (consumo O₂)" value={VO2} unit="mL/min" color={VO2>=200&&VO2<=350?"green":"yellow"} normal="200–350"/>}
          {O2ER!==null&&<Row label="Extracción O₂" value={O2ER} unit="%" color={O2ER>=20&&O2ER<=30?"green":O2ER>30&&O2ER<=40?"yellow":"red"} normal="20–30%"/>}
          {DeltaCO2!==null&&<Row label="ΔCO₂ venosa–arterial" value={DeltaCO2} unit="mmHg" color={DeltaCO2<6?"green":DeltaCO2<8?"yellow":"red"} normal="<6 mmHg"/>}
          {DepLac!==null&&<Row label="Depuración Lactato 2h" value={DepLac} unit="%" color={DepLac>=10?"green":DepLac>=5?"yellow":"red"} normal=">10% en 2h"/>}
          {(RVS||CPO)&&<div style={{marginTop:8}}><G2>{RVS&&<BM label="RVS" value={RVS} unit="WU" color={RVS>=750&&RVS<=1500?T.green:RVS<750?T.yellow:T.red}/>}{CPO&&<BM label="CPO" value={CPO} unit="W" color={CPO>=0.6?T.green:CPO>=0.4?T.yellow:T.red}/>}</G2></div>}
        </Card>
      </>}
    </div>
  </div>);
}

function HemoTab({state,setState,printMode}){
  const[view,setView]=useState("datos");
  const set=k=>val=>setState(d=>({...d,[k]:val}));
  const c=useCalcs(state);
  if(printMode){
    return(<div>
      <div className="print-section"><HemoInputs v={state} set={set}/></div>
      <div className="print-section" style={{marginTop:24}}><HemoResults c={c} v={state}/></div>
    </div>);
  }
  return(<div><div style={{padding:"0 0 14px"}}><VT value={view} onChange={setView}/></div>{view==="datos"?<HemoInputs v={state} set={set}/>:<HemoResults c={c} v={state}/>}</div>);
}

// ─── VENT TAB ─────────────────────────────────────────────────────────────────
function VentTab({state,setState,printMode}){
  const[view,setView]=useState("datos");
  const v=state,set=k=>val=>setState(d=>({...d,[k]:val}));
  const IBW=useMemo(()=>{const h=n(v.altura);if(!h)return null;return r(v.sexo==="M"?50+0.91*(h-152.4):45.5+0.91*(h-152.4),1);},[v.altura,v.sexo]);
  const VTkg=useMemo(()=>{const vt=n(v.vt);if(!vt||!IBW)return null;return r(vt/IBW,1);},[v.vt,IBW]);
  const DP=useMemo(()=>{const pp=n(v.pplat),pe=n(v.peep);if(pp===null||pe===null)return null;return r(pp-pe,1);},[v.pplat,v.peep]);
  const Crs=useMemo(()=>{const vt=n(v.vt);if(!vt||!DP)return null;return r(vt/DP,1);},[v.vt,DP]);
  const MP=useMemo(()=>{const fr=n(v.fr),vt=n(v.vt),pk=n(v.ppico);if(!fr||!vt||!pk||!DP)return null;return r(0.098*fr*vt*(pk-DP/2),1);},[v.fr,v.vt,v.ppico,DP]);
  const PaFi=useMemo(()=>{const po=n(v.pao2),fi=n(v.fio2);if(!po||!fi)return null;return r(po/(fi/100),0);},[v.pao2,v.fio2]);
  const SaFi=useMemo(()=>{const s=n(v.spo2),fi=n(v.fio2);if(!s||!fi)return null;return r(s/(fi/100),0);},[v.spo2,v.fio2]);
  const RSBI=useMemo(()=>{const fr=n(v.fr),vt=n(v.vt);if(!fr||!vt)return null;return r(fr/(vt/1000),0);},[v.fr,v.vt]);
  const berlin=PaFi===null?null:PaFi>=300?"Sin SDRA":PaFi>=200?"SDRA Leve":PaFi>=100?"SDRA Moderado":"SDRA Severo";
  const berlinColor=PaFi===null?T.label:PaFi>=300?T.green:PaFi>=200?T.yellow:T.red;
  const predFallo=[];
  if(n(v.nif)!==null&&n(v.nif)>-30)predFallo.push(`NIF ${v.nif} cmH₂O (meta ≤ −30)`);
  if(RSBI!==null&&RSBI>=100)predFallo.push(`RSBI ${RSBI} rpm/L (meta <100)`);
  if(n(v.p01)!==null&&n(v.p01)<-3)predFallo.push(`P0.1 ${v.p01} cmH₂O (meta ≥ −3)`);
  if(n(v.excursion_diaf)!==null&&n(v.excursion_diaf)<2)predFallo.push(`Excursión diafragma ${v.excursion_diaf} cm (meta >2 cm)`);
  return(<div>
    {!printMode&&<div style={{padding:"0 0 14px"}}><VT value={view} onChange={setView}/></div>}
    {(view==="datos"&&!printMode)?(<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
      <div><SL text="Paciente"/><Card><G2><Sel label="Sexo" value={v.sexo} onChange={set("sexo")} options={[{v:"M",l:"Masculino"},{v:"F",l:"Femenino"}]}/><Inp label="Talla" unit="cm" value={v.altura} onChange={set("altura")}/></G2></Card>
      <SL text="Parámetros Ventilatorios"/><Card><G2><Inp label="VT" unit="mL" value={v.vt} onChange={set("vt")} hint="Meta: 6 mL/kg IBW"/><Inp label="FR" unit="rpm" value={v.fr} onChange={set("fr")}/><Inp label="PEEP" unit="cmH₂O" value={v.peep} onChange={set("peep")}/><Inp label="FiO₂" unit="%" value={v.fio2} onChange={set("fio2")}/><Inp label="P. Pico" unit="cmH₂O" value={v.ppico} onChange={set("ppico")}/><Inp label="P. Plateau" unit="cmH₂O" value={v.pplat} onChange={set("pplat")} hint="Meta ≤30"/></G2></Card></div>
      <div><SL text="Gasometría"/><Card><G2><Inp label="PaO₂" unit="mmHg" value={v.pao2} onChange={set("pao2")}/><Inp label="SpO₂" unit="%" value={v.spo2} onChange={set("spo2")}/></G2></Card>
      <SL text="Predictores de Destete"/><Card><G2><Inp label="NIF" unit="cmH₂O" value={v.nif} onChange={set("nif")} hint="Meta ≤ −30" placeholder="-28"/><Inp label="P0.1" unit="cmH₂O" value={v.p01} onChange={set("p01")} hint="Meta ≥ −3" placeholder="-2"/><Inp label="Excursión diafragma" unit="cm" value={v.excursion_diaf} onChange={set("excursion_diaf")} hint=">2 cm (USG)"/><Inp label="Grosor diafragma" unit="mm" value={v.grosor_diaf} onChange={set("grosor_diaf")} hint=">3 mm"/></G2></Card></div>
    </div>):(<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
      <div><SL text="Mecánica Ventilatoria"/><Card>
        {IBW&&<Row label="Peso Ideal (IBW)" value={IBW} unit="kg" noStatus/>}
        {VTkg!==null&&<Row label="VT/kg IBW" value={VTkg} unit="mL/kg" color={VTkg<=6?"green":VTkg<=8?"yellow":"red"} normal="Meta 6 mL/kg"/>}
        {DP!==null&&<Row label="Driving Pressure (ΔP)" value={DP} unit="cmH₂O" color={DP<=15?"green":DP<=20?"yellow":"red"} normal="Meta <15 cmH₂O"/>}
        {Crs!==null&&<Row label="Distensibilidad (Crs)" value={Crs} unit="mL/cmH₂O" color={Crs>=40?"green":Crs>=25?"yellow":"red"} normal="30–50 mL/cmH₂O"/>}
        {MP!==null&&<Row label="Mechanical Power" value={MP} unit="J/min" color={MP<17?"green":MP<20?"yellow":"red"} normal="Meta <17 J/min"/>}
      </Card></div>
      <div><SL text="Oxigenación"/><Card>
        {PaFi!==null&&<Row label="PaO₂/FiO₂" value={PaFi} color={PaFi>=300?"green":PaFi>=200?"yellow":"red"} normal="Normal ≥300"/>}
        {SaFi!==null&&<Row label="SpO₂/FiO₂" value={SaFi} color={SaFi>=315?"green":SaFi>=235?"yellow":"red"} normal="Normal ≥315"/>}
        {berlin&&<div style={{marginTop:8,padding:"14px 16px",borderRadius:12,background:T.surface2,textAlign:"center",border:`1px solid ${berlinColor}30`}}><div style={{fontSize:18,fontWeight:700,color:berlinColor}}>{berlin}</div></div>}
      </Card>
      <SL text="Predictores de Destete"/><Card>
        {RSBI!==null&&<Row label="RSBI (FR/VT)" value={RSBI} unit="rpm/L" color={RSBI<80?"green":RSBI<100?"yellow":"red"} normal="Meta <100"/>}
        {n(v.nif)!==null&&<Row label="NIF" value={n(v.nif)} unit="cmH₂O" color={n(v.nif)<=-30?"green":n(v.nif)<=-20?"yellow":"red"} normal="Meta ≤ −30"/>}
        {n(v.p01)!==null&&<Row label="P0.1" value={n(v.p01)} unit="cmH₂O" color={n(v.p01)>=-3?"green":n(v.p01)>=-5?"yellow":"red"} normal="Meta ≥ −3"/>}
        {n(v.excursion_diaf)!==null&&<Row label="Excursión diafragma" value={n(v.excursion_diaf)} unit="cm" color={n(v.excursion_diaf)>=2?"green":"red"} normal=">2 cm"/>}
        {predFallo.length===0&&RSBI!==null?<Alrt color="green" icon="✅" title="Sin predictores de fallo" body="Considerar PVE"/>:predFallo.length>0?<Alrt color="red" icon="⚠️" title="Predictores de fallo presentes" body={predFallo.join(" · ")}/>:null}
      </Card></div>
    </div>)}
  </div>);
}

// ─── VEXUS TAB ────────────────────────────────────────────────────────────────
function VexusTab({state,setState}){
  const v=state,set=k=>val=>setState(d=>({...d,[k]:val}));
  const cv=n(v.vci_d)!==null&&n(v.vci_col)!==null?(n(v.vci_d)>=21&&n(v.vci_col)<50):null;
  const cp=n(v.portal_ip)!==null?n(v.portal_ip)>30:null;
  const cr=v.renal_patron!=="normal",ch=v.hepatica!=="normal";
  const score=[cv,cp,cr,ch].filter(x=>x===true).length;
  const grade=cv===null?null:!cv?0:score<=1?1:score<=2?2:3;
  const gradeColor=grade===null?T.label:grade===0?T.green:grade===1?T.yellow:grade===2?"#FF6600":T.red;
  const gradeLabel=grade===null?"—":grade===0?"Sin congestión":grade===1?"Congestión leve":grade===2?"Congestión moderada":"Congestión severa";
  return(<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
    <div>
      <SL text="VCI — Requisito"/><Card><G2><Inp label="Diámetro VCI" unit="mm" value={v.vci_d} onChange={set("vci_d")} hint="≥21mm = congesta"/><Inp label="Colapsabilidad" unit="%" value={v.vci_col} onChange={set("vci_col")} hint="<50% = no colapsa"/></G2>{n(v.vci_d)!==null&&<div style={{marginTop:8}}><Row label="VCI congesta" value={cv?"Sí":"No"} color={cv?"red":"green"}/></div>}</Card>
      <SL text="Vena Portal"/><Card><Inp label="Índice de Pulsatilidad Portal" unit="%" value={v.portal_ip} onChange={set("portal_ip")} hint="(Vmáx−Vmín)/Vmáx × 100 — Patológico >30%"/>{n(v.portal_ip)!==null&&<div style={{marginTop:8}}><Row label="IP Portal" value={`${v.portal_ip}%`} color={n(v.portal_ip)<=30?"green":n(v.portal_ip)<=50?"yellow":"red"} normal="VN ≤30%"/></div>}</Card>
      <SL text="Vena Renal"/><Card><Sel label="Patrón de flujo renal" value={v.renal_patron} onChange={set("renal_patron")} options={[{v:"normal",l:"Continuo (normal)"},{v:"bifasico",l:"Bifásico — discontinuo leve"},{v:"monofasico",l:"Monofásico — discontinuo severo"},{v:"ausente",l:"Ausente — obstrucción severa"}]}/><div style={{marginTop:10,padding:"10px 12px",borderRadius:10,fontSize:13,lineHeight:1.4,background:v.renal_patron==="normal"?SEM.green.bg:v.renal_patron==="bifasico"?SEM.yellow.bg:SEM.red.bg,color:v.renal_patron==="normal"?SEM.green.txt:v.renal_patron==="bifasico"?SEM.yellow.txt:SEM.red.txt}}>{v.renal_patron==="normal"&&"Flujo continuo — Sin congestión venosa renal"}{v.renal_patron==="bifasico"&&"Flujo bifásico — Congestión moderada"}{v.renal_patron==="monofasico"&&"Flujo monofásico — Congestión severa · Riesgo AKI"}{v.renal_patron==="ausente"&&"Flujo ausente — Obstrucción venosa severa"}</div></Card>
      <SL text="Vena Hepática"/><Card><Sel label="Patrón vena hepática" value={v.hepatica} onChange={set("hepatica")} options={[{v:"normal",l:"Onda S > D (normal)"},{v:"sd_igual",l:"S ≈ D (leve)"},{v:"d_mayor",l:"D > S (moderado)"},{v:"inversion",l:"Inversión onda S (severo)"}]}/></Card>
    </div>
    <div><SL text="Score VExUS"/><Card>{grade===null?<div style={{textAlign:"center",padding:24,color:T.label,fontSize:14}}>Ingresa datos de VCI para graduar</div>:<div>
      <div style={{textAlign:"center",padding:"20px 16px 16px",borderRadius:12,background:T.surface2,marginBottom:14}}><div style={{fontSize:56,fontWeight:800,color:gradeColor,lineHeight:1}}>{grade}</div><div style={{fontSize:15,color:gradeColor,fontWeight:600,marginTop:6}}>{gradeLabel}</div></div>
      {[[`VCI ≥21mm + colapso <50%`,cv,"Requisito"],[`Portal IP >30%`,cp,"Portal"],["Renal discontinuo",cr,"Renal"],["Hepática alterada",ch,"Hepática"]].map(([lbl,val,cat])=><Row key={lbl} label={lbl} value={val===true?"Sí":val===false?"No":"—"} color={val===true?"red":val===false?"green":"gray"} normal={cat}/>)}
      {grade>=2&&<Alrt color="red" icon="⚠️" title="Congestión significativa" body="Restricción hídrica · Evaluar diuréticos o ultrafiltración"/>}
    </div>}</Card></div>
  </div>);
}

// ─── NEURO TAB ────────────────────────────────────────────────────────────────
function NeuroTab({state,setState,printMode}){
  const[view,setView]=useState("datos");
  const v=state,set=k=>val=>setState(d=>({...d,[k]:val}));
  const IP=useMemo(()=>{const vps=n(v.vps),vfd=n(v.vfd),vm=n(v.vm);if(vps===null||vfd===null||!vm)return null;return r((vps-vfd)/vm,2);},[v.vps,v.vfd,v.vm]);
  const PPC=useMemo(()=>{const pam=n(v.pam),vfd=n(v.vfd),vm=n(v.vm);if(!pam||!vfd||!vm)return null;return r(pam*vfd/vm+14,1);},[v.pam,v.vfd,v.vm]);
  const PIC=useMemo(()=>{if(IP===null)return null;return r(10.93*IP-1.28,1);},[IP]);
  const Lind=useMemo(()=>{const vm=n(v.vm),aci=n(v.vm_aci);if(!vm||!aci)return null;return r(vm/aci,2);},[v.vm,v.vm_aci]);
  const DLM=useMemo(()=>{const a=n(v.dlm_a),b=n(v.dlm_b);if(!a||!b)return null;return r(Math.abs(a-b)/2,1);},[v.dlm_a,v.dlm_b]);
  return(<div>
    {!printMode&&<div style={{padding:"0 0 14px"}}><VT value={view} onChange={setView}/></div>}
    {printMode&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
      <div><SL text="Doppler Transcraneal — ACM"/><Card><G2><Inp label="VPS (pico sistólico)" unit="cm/s" value={v.vps} onChange={set("vps")} hint="VN <80 cm/s"/><Inp label="VFD (fin diástole)" unit="cm/s" value={v.vfd} onChange={set("vfd")}/><Inp label="VM (velocidad media)" unit="cm/s" value={v.vm} onChange={set("vm")}/><Inp label="PAM" unit="mmHg" value={v.pam} onChange={set("pam")} hint="Para PPC estimada"/></G2></Card></div>
      <div><SL text="Resultados DTC"/><Card>
        {n(v.vps)!==null&&<Row label="VPS ACM" value={n(v.vps)} unit="cm/s" color={n(v.vps)<80?"green":n(v.vps)<160?"yellow":"red"} normal="VN <80 cm/s"/>}
        {IP!==null&&<Row label="IP" value={IP} color={IP>=0.6&&IP<=1.1?"green":IP>1.1&&IP<=1.4?"yellow":"red"} normal="VN 0.6–1.1"/>}
        {PPC!==null&&<Row label="PPC estimada" value={PPC} unit="mmHg" color={PPC>=60?"green":PPC>=50?"yellow":"red"} normal="≥60 mmHg"/>}
        {PIC!==null&&<Row label="PIC estimada" value={PIC} unit="mmHg" color={PIC<=15?"green":PIC<=20?"yellow":"red"} normal="≤15 mmHg"/>}
        {Lind!==null&&<Row label="Lindegaard" value={Lind} color={Lind<3?"yellow":Lind<=6?"yellow":"red"} normal="Hiperemia <3 · Espasmo >6"/>}
        {DLM!==null&&<Row label="DLM" value={DLM} unit="cm" color={DLM<0.5?"green":DLM<1?"yellow":"red"} normal="VN <0.5 cm"/>}
      </Card></div>
    </div>}
    {!printMode&&(view==="datos")?(<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
      <div><SL text="Doppler Transcraneal — ACM"/><Card><G2><Inp label="VPS (pico sistólico)" unit="cm/s" value={v.vps} onChange={set("vps")} hint="VN <80 cm/s"/><Inp label="VFD (fin diástole)" unit="cm/s" value={v.vfd} onChange={set("vfd")}/><Inp label="VM (velocidad media)" unit="cm/s" value={v.vm} onChange={set("vm")}/><Inp label="PAM" unit="mmHg" value={v.pam} onChange={set("pam")} hint="Para PPC estimada"/></G2></Card></div>
      <div><SL text="Índice de Lindegaard"/><Card><Inp label="VM Arteria Carótida Interna (ACI)" unit="cm/s" value={v.vm_aci} onChange={set("vm_aci")} hint="Doppler a nivel mandibular"/></Card>
      <SL text="Desviación Línea Media"/><Card><G2><Inp label="A (temporal → 3er ventrículo)" unit="cm" value={v.dlm_a} onChange={set("dlm_a")}/><Inp label="B (temporal contralateral)" unit="cm" value={v.dlm_b} onChange={set("dlm_b")}/></G2><div style={{marginTop:8,fontSize:12,color:T.label}}>DLM = |A − B| / 2</div></Card></div>
    </div>):(<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
      <div><SL text="Resultados DTC"/><Card>
        {n(v.vps)!==null&&<Row label="VPS ACM" value={n(v.vps)} unit="cm/s" color={n(v.vps)<80?"green":n(v.vps)<160?"yellow":"red"} normal="VN <80 cm/s"/>}
        {IP!==null&&<Row label="Índice de Pulsatilidad (IP)" value={IP} color={IP>=0.6&&IP<=1.1?"green":IP>1.1&&IP<=1.4?"yellow":"red"} normal="VN 0.6–1.1"/>}
        {PPC!==null&&<Row label="PPC estimada" value={PPC} unit="mmHg" color={PPC>=60?"green":PPC>=50?"yellow":"red"} normal="Meta ≥60 mmHg"/>}
        {PIC!==null&&<Row label="PIC estimada (DTC)" value={PIC} unit="mmHg" color={PIC<=15?"green":PIC<=20?"yellow":"red"} normal="VN ≤15 mmHg"/>}
        {Lind!==null&&<Row label="Índice de Lindegaard" value={Lind} color={Lind<3?"yellow":Lind<=6?"yellow":"red"} normal="Hiperemia <3 · Espasmo >6"/>}
        {DLM!==null&&<Row label="Desviación Línea Media" value={DLM} unit="cm" color={DLM<0.5?"green":DLM<1?"yellow":"red"} normal="VN <0.5 cm"/>}
      </Card></div>
      <div><SL text="Fórmulas"/><Card><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>{[["IP = (VPS−VFD)/VM","0.6–1.1"],["PPC = PAM×VFD/VM + 14","≥60 mmHg"],["PIC = 10.93×IP − 1.28","≤15 mmHg"],["Lindegaard = VM ACM/ACI","<3 = hiperemia"],["VPS espasmo grave","≥200 cm/s"],["Lindegaard espasmo",">6"]].map(([f,val])=><div key={f} style={{padding:"9px 10px",background:T.surface2,borderRadius:8}}><div style={{fontSize:11,color:T.label,marginBottom:2}}>{f}</div><div style={{fontSize:12,fontWeight:600,color:ACCENT}}>{val}</div></div>)}</div></Card></div>
    </div>)}
  </div>);
}

// ─── FARMACOS DATA ────────────────────────────────────────────────────────────
const FARMACOS=[
  // VASOPRESORES
  {id:"nora",nombre:"Norepinefrina",alias:"Nora / Levophed",grupo:"vasopresor",emoji:"🔴",presentacion:"Ampolla 4 mg/4 mL (1 mg/mL base)",dilucion:"4 mg en 96 mL DAD5% = 40 mcg/mL en 100 mL",diluyente:"DAD5% obligatorio — SF solo NO recomendado por FDA (oxidación)",via:"Central preferida · Periférica <48h en vena gruesa",unidad:"mcg/kg/min",infusion:{inicio:"0.01–0.05",mantenimiento:"0.05–0.3",maximo:">0.5 = shock refractario"},bolo:null,
  notas:["⭐ Primera línea en shock séptico (Surviving Sepsis 2021)","⭐ Primera línea en shock cardiogénico — Nora + Dobuta reduce mortalidad vs otros esquemas","Tapar de la luz — se oxida","No suspender bruscamente — tapar gradualmente","Extravasación → necrosis → infiltrar con Fentolamina 5–10 mg en 10 mL SF","⚠️ En embarazo: puede reducir flujo uteroplacentario — usar si beneficio > riesgo",">0.25 mcg/kg/min → evaluar agregar Vasopresina (ahorro de catecolaminas)","⚠️ En IAM con shock: Nora superior a Adrenalina (menos shock refractario — Levy JACC 2018)"],
  fuente:"FDA PI Levophed · Surviving Sepsis 2021 · StatPearls 2024"},
  {id:"adrenalina",nombre:"Adrenalina",alias:"Epinefrina / Epi",grupo:"vasopresor",emoji:"🔴",presentacion:"Ampolla 1 mg/1 mL",dilucion:"4 mg en 96 mL DAD5% = 40 mcg/mL en 100 mL",diluyente:"DAD5% o SF",via:"Central",unidad:"mcg/kg/min",infusion:{inicio:"0.01–0.05",mantenimiento:"0.05–0.3",maximo:">0.5 = dosis muy alta"},bolo:{dosis:"1 mg IV",indicacion:"PCR: 1 mg c/3–5 min · Anafilaxia: 0.3–0.5 mg IM muslo"},
  notas:["⭐ Primera línea en PCR (AHA ACLS 2020)","⭐ Primera línea en anafilaxia (IM muslo externo)","Segunda línea en shock séptico refractario a Nora","⚠️ En IAM-CS: más arritmias y shock refractario que Nora — evitar si alternativa disponible (Levy JACC 2018)","⚠️ En embarazo: vasoconstricción uterina — USAR en anafilaxia porque beneficio > riesgo","Causa hiperglicemia — monitoreo glucosa","No mezclar con bicarbonato — inactiva la adrenalina","Aumenta consumo miocárdico de O₂ — monitoreo ECG continuo"],
  fuente:"AHA ACLS 2020 · Surviving Sepsis 2021 · Levy JACC 2018"},
  {id:"vasopresina",nombre:"Vasopresina",alias:"ADH / Pitressin",grupo:"vasopresor",emoji:"🔴",presentacion:"Ampolla 20 UI/mL",dilucion:"20 UI en 80 mL SF = 0.2 UI/mL en 100 mL",diluyente:"SF o DAD5%",via:"Central",unidad:"UI/min",infusion:{inicio:"0.01",mantenimiento:"0.01–0.03",maximo:"0.04 UI/min — NO titular más allá"},bolo:null,
  notas:["Segunda línea en shock séptico — agregar cuando Nora >0.25 mcg/kg/min (VASST Trial)","NO se titula al alza como catecolaminas — dosis fija","Ahorra catecolaminas — permite reducir Nora","⚠️ Isquemia digital, mesentérica y coronaria a dosis altas — monitoreo","Útil en shock vasopléjico post-cirugía cardíaca","En PCR: 40 UI IV bolo único (reemplaza 1ª o 2ª dosis Adrenalina)","⚠️ En embarazo: produce contracciones uterinas — EVITAR salvo emergencia vital","No suspender bruscamente en infusión prolongada"],
  fuente:"VASST Trial · Surviving Sepsis 2021 · AHA ACLS 2020"},
  {id:"dopamina",nombre:"Dopamina",alias:"Dopa",grupo:"vasopresor",emoji:"🔴",presentacion:"Ampolla 200 mg/5 mL (40 mg/mL)",dilucion:"200 mg en 100 mL DAD5% = 2000 mcg/mL",diluyente:"DAD5% o SF",via:"Central",unidad:"mcg/kg/min",infusion:{inicio:"2–5",mantenimiento:"5–10 (vasopresora)",maximo:"20 mcg/kg/min"},bolo:null,
  notas:["Dosis baja 1–3 mcg/kg/min: efecto dopaminérgico (vasodilatación renal) — evidencia débil, no usar como nefroprotector","Dosis media 3–10 mcg/kg/min: efecto β1 (inotrópico, cronotropo)","Dosis alta >10 mcg/kg/min: efecto α1 (vasoconstrictor)","⚠️ Más arritmias que Norepinefrina (De Backer NEJM 2010) — inferior en sepsis","⚠️ Contraindicada en alergia a sulfas","Extravasación → necrosis → infiltrar con Fentolamina","⚠️ En embarazo: cruza placenta — datos limitados, usar solo si no hay alternativa"],
  fuente:"De Backer NEJM 2010 · Surviving Sepsis 2021"},
  {id:"fenilefrina",nombre:"Fenilefrina",alias:"Neo-Synephrine",grupo:"vasopresor",emoji:"🔴",presentacion:"Ampolla 10 mg/mL",dilucion:"50 mg en 50 mL SF = 1 mg/mL",diluyente:"SF o DAD5%",via:"Central o periférica",unidad:"mcg/kg/min",infusion:{inicio:"0.1–0.5",mantenimiento:"0.5–2",maximo:"3 mcg/kg/min"},bolo:{dosis:"50–200 mcg IV",indicacion:"Hipotensión perioperatoria · Taquicardia + hipotensión"},
  notas:["Vasoconstrictor puro α1 — NO efecto inotrópico","Puede causar bradicardia refleja — útil si taquicardia + hipotensión","⭐ Útil en estenosis aórtica con hipotensión (mantiene RVS sin aumentar FC)","⚠️ Puede reducir gasto cardíaco — NO usar en bajo GC","No primera línea en shock séptico","⚠️ En embarazo: puede reducir flujo útero-placentario"],
  fuente:"Stanford Cardiac Anesthesia Resources · UpToDate 2024"},
  // INOTRÓPICOS
  {id:"dobutamina",nombre:"Dobutamina",alias:"Dobuta / Dobutrex",grupo:"inotrópico",emoji:"🟠",presentacion:"Ampolla 250 mg/20 mL (12.5 mg/mL)",dilucion:"250 mg en 100 mL DAD5% = 2500 mcg/mL",diluyente:"DAD5% o SF",via:"Central o periférica gruesa",unidad:"mcg/kg/min",infusion:{inicio:"2.5",mantenimiento:"5–15",maximo:"20 mcg/kg/min"},bolo:null,
  notas:["⭐ Primera línea inotrópico en shock cardiogénico con PAM adecuada","⭐ Nora + Dobuta: reduce mortalidad vs otros esquemas en shock (Levy Crit Care Med 2011)","Efecto β1 predominante — aumenta contractilidad y FC","Puede causar hipotensión — agregar vasopresor si PAM cae","⚠️ En IAM: puede aumentar tamaño del infarto por mayor consumo de O₂ miocárdico — usar con cautela","⚠️ Contraindicada en alergia a sulfas","Taquifilaxia posible con uso prolongado >72h","⚠️ En embarazo: datos limitados — usar solo si beneficio > riesgo"],
  fuente:"Surviving Sepsis 2021 · Levy Crit Care Med 2011 · StatPearls 2024"},
  {id:"milrinona",nombre:"Milrinona",alias:"Primacor",grupo:"inotrópico",emoji:"🟠",presentacion:"Ampolla 10 mg/10 mL (1 mg/mL)",dilucion:"10 mg en 90 mL DAD5% = 100 mcg/mL en 100 mL",diluyente:"DAD5% — NO SF (precipita)",via:"Central",unidad:"mcg/kg/min",infusion:{inicio:"0.375",mantenimiento:"0.375–0.5",maximo:"0.75 mcg/kg/min"},bolo:{dosis:"50 mcg/kg en 10 min",indicacion:"Carga opcional — omitir si hay hipotensión"},
  notas:["Inhibidor de fosfodiesterasa III — inodilatador","⭐ Útil en disfunción VD, HTP, post-cirugía cardíaca","⭐ Alternativa en pacientes con β-bloqueo crónico (acción independiente de receptores β)","Milrinona vs Dobuta en shock cardiogénico: sin diferencia en mortalidad (CAPITAL DOREMI, NEJM 2021)","⚠️ Causa vasodilatación → hipotensión — requiere vasopresor concomitante","⚠️ NO diluir en SF — precipita","Vida media larga (2–3h) — efectos difíciles de revertir","Reducir dosis en insuficiencia renal (excreción renal 80%)"],
  fuente:"CAPITAL DOREMI NEJM 2021 · ACCM Guidelines 2017"},
  {id:"levosimendan",nombre:"Levosimendan",alias:"Simdax",grupo:"inotrópico",emoji:"🟠",presentacion:"Ampolla 12.5 mg/5 mL (2.5 mg/mL)",dilucion:"12.5 mg en 87.5 mL DAD5% = 0.1 mg/mL en 100 mL",diluyente:"DAD5% exclusivamente",via:"Central",unidad:"mcg/kg/min",infusion:{inicio:"0.05",mantenimiento:"0.05–0.1",maximo:"0.2 mcg/kg/min"},bolo:{dosis:"12 mcg/kg en 10 min",indicacion:"Carga opcional — omitir si PAS <100 mmHg o FC >120"},
  notas:["Sensibilizador al calcio — NO aumenta consumo miocárdico de O₂","Efecto sostenido 7–9 días por metabolito activo OR-1896","⭐ Útil en IC aguda descompensada, shock cardiogénico, post-cardiotomía","⭐ En IAM-CS: efecto positivo sobre acoplamiento ventrículo-arterial (RUSSLAN, LEAF trials)","⭐ Alternativa a Dobuta en β-bloqueo crónico — acción independiente de receptores β","⚠️ Hipotensión frecuente — tener vasopresor listo","⚠️ NO disponible en USA — sí en Ecuador y Europa","Monitoreo QT — puede prolongarlo"],
  fuente:"SURVIVE Trial · ESC HF Guidelines 2021 · Riccardi Eur J Heart Fail 2024"},
  // SEDANTES
  {id:"propofol",nombre:"Propofol",alias:"Propo / Diprivan",grupo:"sedante",emoji:"🟡",presentacion:"Frasco 200 mg/20 mL (10 mg/mL) · Frasco 1g/100 mL (10 mg/mL)",dilucion:"Listo para uso — NO diluir",diluyente:"No aplica — emulsión lipídica lista",via:"Central o periférica gruesa · Jeringa opaca",unidad:"mg/kg/h",infusion:{inicio:"0.5",mantenimiento:"1–3",maximo:"4 mg/kg/h — riesgo PRIS >48h"},bolo:{dosis:"0.5–2 mg/kg IV lento",indicacion:"Inducción RSI · Procedimientos"},
  notas:["RSI: 1–2 mg/kg IV · Reducir a 0.5 mg/kg en shock","⚠️ PRIS (Propofol Infusion Syndrome): triglicéridos, acidosis, falla cardíaca — riesgo >4 mg/kg/h por >48h","Monitorear triglicéridos cada 48h en infusiones prolongadas","Contiene 1.1 kcal/mL de grasa — incluir en balance calórico","Hipotensión frecuente al inicio — titular lento","No tiene efecto analgésico — combinar con opioides","Cambiar jeringa/equipo cada 12h — riesgo de contaminación","⚠️ En embarazo: Categoría B — puede usarse en RSI obstétrica con precaución"],
  fuente:"SCCM PAD Guidelines 2018 · FDA PI Diprivan · StatPearls 2024"},
  {id:"midazolam",nombre:"Midazolam",alias:"Dormicum / Versed",grupo:"sedante",emoji:"🟡",presentacion:"Ampolla 15 mg/3 mL · Ampolla 50 mg/10 mL (5 mg/mL)",dilucion:"50 mg en 50 mL SF = 1 mg/mL · Alt: 50 mg en 100 mL SF = 0.5 mg/mL",diluyente:"SF o DAD5%",via:"Central o periférica",unidad:"mg/kg/h",infusion:{inicio:"0.02",mantenimiento:"0.02–0.1",maximo:"0.2 mg/kg/h"},bolo:{dosis:"0.01–0.05 mg/kg IV",indicacion:"Sedación procedimiento · RSI · Estatus epiléptico"},
  notas:["⚠️ Acumulación en falla renal y hepática — metabolito activo 1-OH midazolam","⚠️ Infusiones prolongadas → tolerancia, abstinencia, delirio","RSI bolo: 0.02–0.03 mg/kg (sedación leve) — evitar en shock","Útil en estatus epiléptico refractario (segunda línea)","No tiene efecto analgésico","⚠️ En embarazo: Categoría D — cruza placenta, puede causar depresión neonatal. Usar solo si imprescindible"],
  fuente:"SCCM PAD Guidelines 2018 · StatPearls 2024"},
  {id:"dexmedetomidina",nombre:"Dexmedetomidina",alias:"Dexme / Precedex",grupo:"sedante",emoji:"🟡",presentacion:"Ampolla 200 mcg/2 mL (100 mcg/mL)",dilucion:"200 mcg en 48 mL SF = 4 mcg/mL en 50 mL · Alt: 400 mcg en 96 mL SF = 4 mcg/mL en 100 mL",diluyente:"SF",via:"Central o periférica",unidad:"mcg/kg/h",infusion:{inicio:"0.2",mantenimiento:"0.2–0.7",maximo:"1.4 mcg/kg/h"},bolo:null,
  notas:["⚠️ NO dar bolo — bradicardia severa y colapso hemodinámico","Iniciar a 1.4 mcg/kg/h si se necesita efecto rápido, luego titular hacia abajo","Sedación cooperativa — paciente arousable, sin depresión respiratoria","Reduce delirio vs benzodiacepinas (MENDS, SEDCOM trials)","Útil para weaning ventilatorio — continuar tras extubación","Bradicardia e hipotensión frecuentes — monitoreo continuo","⚠️ En embarazo: Categoría C — datos limitados, usar con precaución"],
  fuente:"MENDS Trial · SEDCOM Trial · SCCM PAD 2018"},
  {id:"ketamina",nombre:"Ketamina",alias:"Ketalar",grupo:"sedante",emoji:"🟡",presentacion:"Ampolla 500 mg/10 mL (50 mg/mL) · Alt: 200 mg/10 mL",dilucion:"500 mg en 500 mL SF = 1 mg/mL (infusión analgésica)",diluyente:"SF o DAD5%",via:"Central o periférica",unidad:"mg/kg/h (infusión) · mg/kg (bolo)",infusion:{inicio:"0.1",mantenimiento:"0.1–0.3",maximo:"1–2 mg/kg/h (sedación profunda)"},bolo:{dosis:"1–2 mg/kg IV (RSI) · 0.5–1 mg/kg (procedimiento)",indicacion:"RSI · Broncospasmo · Procedimientos · Analgesia disociativa"},
  notas:["⭐ RSI: 1–2 mg/kg IV — preferir en shock, broncoespasmo, trauma","⭐ Analgesia subanestésica: 0.1–0.3 mg/kg/h — sinergismo con Dexme","⭐ En embarazo: se puede usar en RSI obstétrica (broncoespasmo, hipovolemia) — aumenta tono uterino pero útil si beneficio > riesgo","Broncodilatador — útil en estatus asmático","⚠️ Aumenta secreciones — considerar glicopirrolato concomitante","⚠️ Puede causar alucinaciones/disforia — minimizar con BZD o Dexme","⚠️ Aumenta PA y FC — precaución en coronariopatía activa","No aumenta PIC cuando hay ventilación controlada (evidencia actual)"],
  fuente:"EMCrit IBCC 2024 · StatPearls 2024"},
  // ANALGÉSICOS
  {id:"fentanilo",nombre:"Fentanilo",alias:"Fenta",grupo:"analgésico",emoji:"🟢",presentacion:"Ampolla 500 mcg/10 mL (50 mcg/mL) · Alt: 250 mcg/5 mL",dilucion:"1000 mcg en 90 mL SF = 10 mcg/mL en 100 mL",diluyente:"SF o DAD5%",via:"Central o periférica",unidad:"mcg/kg/h",infusion:{inicio:"0.5",mantenimiento:"0.5–2",maximo:"3–4 mcg/kg/h"},bolo:{dosis:"0.5–1.5 mcg/kg IV",indicacion:"Analgesia procedimiento · RSI"},
  notas:["Preferir bolos PRN sobre infusión continua (SCCM PAD 2018)","Infusión continua → acumulación en tejido adiposo → sedación prolongada","Estable en falla renal — metabolismo hepático, metabolitos inactivos","RSI: 3 mcg/kg IV previo a laringoscopia (bloquea respuesta HTA/taquicardia)","⚠️ Rigidez torácica con bolos rápidos de alta dosis","100 veces más potente que morfina","⚠️ En embarazo: cruza placenta — puede causar depresión respiratoria neonatal. Usar dosis mínima","Naloxona disponible como antídoto"],
  fuente:"SCCM PAD Guidelines 2018 · StatPearls 2024"},
  {id:"remifentanilo",nombre:"Remifentanilo",alias:"Remifenta / Ultiva",grupo:"analgésico",emoji:"🟢",presentacion:"Vial polvo 2 mg (reconstituir en 4 mL DAD5% = 500 mcg/mL)",dilucion:"2 mg reconstituido + 96 mL SF = 20 mcg/mL en 100 mL",diluyente:"SF o DAD5%",via:"Central exclusivamente",unidad:"mcg/kg/min",infusion:{inicio:"0.025",mantenimiento:"0.05–0.2",maximo:"0.5 mcg/kg/min"},bolo:null,
  notas:["⚠️ NO dar bolo — apnea y bradicardia severa","Vida media 3–5 min — eliminación por esterasas plasmáticas (órgano-independiente)","⭐ Ideal en falla renal y hepática — no acumulación","Sin efecto residual al suspender → planear analgesia de transición antes","⚠️ Hiperalgesia opioide con uso prolongado","⚠️ En embarazo: cruza placenta rápidamente — datos limitados en UCI"],
  fuente:"StatPearls 2024 · UpToDate 2024"},
  {id:"morfina",nombre:"Morfina",alias:"MSO4",grupo:"analgésico",emoji:"🟢",presentacion:"Ampolla 10 mg/1 mL",dilucion:"50 mg en 50 mL SF = 1 mg/mL",diluyente:"SF o DAD5%",via:"Central o periférica",unidad:"mg/kg/h",infusion:{inicio:"0.01",mantenimiento:"0.01–0.05",maximo:"0.1 mg/kg/h"},bolo:{dosis:"0.05–0.1 mg/kg IV",indicacion:"Analgesia aguda · Edema agudo de pulmón"},
  notas:["⚠️ Acumulación de metabolito activo (morfina-6-glucurónido) en falla renal","Libera histamina — puede causar hipotensión, broncoespasmo","Evitar en asma activo, falla renal severa","⭐ Útil en edema pulmonar agudo (vasodilatación venosa)","⚠️ En embarazo: cruza placenta — depresión neonatal. Naloxona neonatal disponible","Naloxona antídoto: 0.04 mg IV c/2 min hasta respuesta"],
  fuente:"StatPearls 2024 · UpToDate 2024"},
  // RELAJANTES
  {id:"rocuronio",nombre:"Rocuronio",alias:"Esmeron",grupo:"relajante",emoji:"🔵",presentacion:"Ampolla 50 mg/5 mL (10 mg/mL)",dilucion:"No diluir para RSI · Infusión: 200 mg en 200 mL SF = 1 mg/mL",diluyente:"SF o DAD5%",via:"Central o periférica (RSI) · Central (infusión)",unidad:"mg/kg (bolo) · mcg/kg/min (infusión)",infusion:{inicio:"10",mantenimiento:"10–12 mcg/kg/min",maximo:"Titular a TOF 1–2/4"},bolo:{dosis:"RSI: 1.2 mg/kg IV · Electivo: 0.6 mg/kg",indicacion:"RSI · Intubación electiva"},
  notas:["RSI: 1.2 mg/kg — intubación en 60–90 seg","Alta dosis en shock: 1.4 mg/kg — mayor velocidad de onset","⭐ Revertir con Sugammadex: 16 mg/kg RSI completo · 4 mg/kg bloqueo moderado · 2 mg/kg leve","⚠️ NO preferido para infusión continua prolongada UCI — riesgo acumulación y miopatía","Monitoreo TOF obligatorio en infusión continua","⚠️ En embarazo: puede usarse en RSI obstétrica — cruza poco la placenta a dosis normales"],
  fuente:"EMCrit IBCC 2024 · StatPearls 2024"},
  {id:"cisatracurio",nombre:"Cisatracurio",alias:"Nimbex",grupo:"relajante",emoji:"🔵",presentacion:"Ampolla 20 mg/10 mL (2 mg/mL)",dilucion:"40 mg en 80 mL SF = 0.5 mg/mL en 100 mL",diluyente:"SF o DAD5%",via:"Central",unidad:"mcg/kg/min",infusion:{inicio:"1",mantenimiento:"1–3",maximo:"Titular a TOF 1–2/4"},bolo:{dosis:"0.1–0.2 mg/kg IV",indicacion:"Intubación · Inicio de infusión UCI"},
  notas:["⭐ PREFERIDO en UCI — metabolismo de Hofmann (órgano-independiente)","⭐ Ideal en SDRA severo (PaFi <150), falla renal, falla hepática","Sin liberación de histamina — estabilidad cardiovascular","Sin metabolitos activos — no acumulación","Monitoreo TOF: meta 1–2 twitches de 4","Suspender periódicamente para evaluar función muscular (c/24h si posible)","No reversible con Sugammadex — esperar recuperación espontánea","⚠️ En embarazo: Categoría B — datos limitados, preferir sobre aminosteroideos"],
  fuente:"ACURASYS Trial · ROSE Trial · SCCM NMBA Guidelines"},
  {id:"succinilcolina",nombre:"Succinilcolina",alias:"Suxametonio / SUX",grupo:"relajante",emoji:"🔵",presentacion:"Ampolla 500 mg/10 mL (50 mg/mL)",dilucion:"No diluir — usar directo para RSI",diluyente:"No aplica",via:"IV directo",unidad:"mg/kg",infusion:null,bolo:{dosis:"1–1.5 mg/kg IV",indicacion:"RSI — onset 45–60 seg, duración 8–10 min"},
  notas:["⭐ Relajante despolarizante de elección para RSI por onset rápido","⚠️ CONTRAINDICACIONES ABSOLUTAS: Quemados >24h, lesión medular >24h, hiperkalemia, miopatías, historia personal/familiar de hipertermia maligna","⚠️ Libera K+ hasta +1 mEq/L — peligroso en hiperkalemia previa","⚠️ Puede precipitar hipertermia maligna — Dantroleno 2.5 mg/kg IV disponible","Alternativa si contraindicada: Rocuronio 1.2 mg/kg + Sugammadex 16 mg/kg","⚠️ En embarazo: puede usarse en RSI obstétrica — no pasa placenta significativamente","NO usar en infusión continua"],
  fuente:"StatPearls 2024 · Miller Anesthesia 9th Ed"},
  // ANTIHIPERTENSIVOS
  {id:"nitroprusiato",nombre:"Nitroprusiato de Sodio",alias:"NPS / Nipride",grupo:"antihipertensivo",emoji:"🟣",presentacion:"Vial polvo 50 mg",dilucion:"50 mg en 250 mL DAD5% = 200 mcg/mL · Alt: 50 mg en 100 mL DAD5% = 500 mcg/mL",diluyente:"DAD5% EXCLUSIVAMENTE · NO SF",via:"Central — cubrir equipo de luz",unidad:"mcg/kg/min",infusion:{inicio:"0.1–0.3",mantenimiento:"0.5–3",maximo:"8–10 mcg/kg/min"},bolo:null,
  notas:["⚠️ NEUROCRÍTICO: Vasodilatador cerebral — AUMENTA PIC · CONTRAINDICADO en HTE o TCE","⚠️ Toxicidad por cianuro: riesgo con >2 mcg/kg/min por >48–72h","Síntomas toxicidad: acidosis láctica, confusión, convulsiones","Antídoto cianuro: Hidroxicobalamina 5g IV en 15 min","⚠️ Cubrir jeringa y equipo — fotosensible (se degrada con luz)","Onset inmediato, efecto cesa en 1–10 min al suspender","⭐ Útil en disección aórtica (con beta-bloqueador), emergencias hipertensivas sin contraindicación","⚠️ En embarazo: toxicidad fetal por cianuro — EVITAR si es posible"],
  fuente:"UpToDate 2024 · JNC 8 · Neurocritical Care Guidelines"},
  {id:"nitroglicerina",nombre:"Nitroglicerina",alias:"NTG / Tridil",grupo:"antihipertensivo",emoji:"🟣",presentacion:"Ampolla 50 mg/10 mL (5 mg/mL)",dilucion:"50 mg en 250 mL DAD5% = 200 mcg/mL · Alt: 50 mg en 100 mL DAD5% = 500 mcg/mL",diluyente:"DAD5% o SF — equipos NO de PVC (absorción)",via:"Central o periférica gruesa — equipos especiales sin PVC",unidad:"mcg/kg/min",infusion:{inicio:"0.1",mantenimiento:"0.1–3",maximo:"10 mcg/kg/min"},bolo:{dosis:"50–100 mcg IV",indicacion:"Crisis HTA aguda · Isquemia coronaria · Edema agudo de pulmón"},
  notas:["⭐ Primera línea en SCA con HTA, edema pulmonar isquémico, IC aguda","⚠️ NEUROCRÍTICO: Vasodilatador cerebral — puede aumentar PIC · Precaución en HTE","Vasodilatador venoso predominante a bajas dosis → reduce precarga","⚠️ Taquifilaxia en 24–48h con infusión continua","⚠️ Absorción en PVC — usar equipos de polietileno o vidrio","⚠️ CONTRAINDICADA con Sildenafil, Tadalafil, Vardenafil — hipotensión severa","Cefalea frecuente — efecto vasodilatador cerebral","⚠️ En embarazo: puede usarse con precaución (eclampsia, HTA severa obstétrica)"],
  fuente:"ESC ACS Guidelines 2023 · UpToDate 2024"},
  {id:"labetalol",nombre:"Labetalol",alias:"Trandate",grupo:"antihipertensivo",emoji:"🟣",presentacion:"Ampolla 100 mg/20 mL (5 mg/mL)",dilucion:"200 mg en 200 mL SF = 1 mg/mL · Bolo: usar directo",diluyente:"SF o DAD5%",via:"Central o periférica",unidad:"mg/min (infusión) · mg (bolo)",infusion:{inicio:"0.5",mantenimiento:"0.5–2 mg/min",maximo:"300 mg/sesión total"},bolo:{dosis:"20 mg IV lento (2 min) · Repetir 40–80 mg c/10 min",indicacion:"Crisis HTA · Disección aórtica · Eclampsia"},
  notas:["Bloqueo α + β combinado — reduce PA sin taquicardia refleja","⭐ Primera línea en disección aórtica — reduce FC y PA simultáneamente","⭐ Útil en emergencia HTA con taquicardia","⭐ En embarazo: SEGURO — fármaco de elección en crisis HTA obstétrica y eclampsia","⚠️ CONTRAINDICADO: Asma, EPOC severo, BAV 2°-3°, IC descompensada, bradicardia","Efecto prolongado 3–6h — precaución en hipotensión","No usar en feocromocitoma sin alfa-bloqueador previo"],
  fuente:"JNC 8 · ESC Hypertension 2023 · ACOG Guidelines 2022"},
  // ANTIARRÍTMICOS
  {id:"amiodarona",nombre:"Amiodarona",alias:"Cordarone",grupo:"antiarritmico",emoji:"💛",presentacion:"Ampolla 150 mg/3 mL (50 mg/mL) · Alt: 300 mg/6 mL",dilucion:"Carga: 150 mg en 100 mL DAD5%\nMantenimiento: 900 mg en 500 mL DAD5% = 1.8 mg/mL\n⚠️ Envases vidrio o poliolefina — NO PVC",diluyente:"DAD5% EXCLUSIVAMENTE — NO SF",via:"Central preferida — flebitis en periférica",unidad:"mg/min",infusion:{inicio:"1 mg/min × 6h",mantenimiento:"0.5 mg/min × 18h",maximo:"30 mg/min · máx 2.4g/24h"},bolo:{dosis:"150 mg en 10 min · PCR: 300 mg bolo directo",indicacion:"Taquiarritmia con pulso · PCR FV/TVSP"},
  notas:["⭐ Régimen estándar 24h: 150mg/10min → 1mg/min×6h → 0.5mg/min×18h = 1g total (StatPearls 2024)","⭐ PCR (FV/TVSP): 300 mg bolo IV directo · 2da dosis: 150 mg si persiste (AHA ACLS 2020)","⭐ FA con RVR: 150 mg en 10 min + infusión mantenimiento","⚠️ NO diluir en SF — usar solo DAD5%","⚠️ NO usar bolsas PVC para infusiones >2h — usar vidrio o poliolefina","⚠️ Hipotensión frecuente (16%) — reducir velocidad de infusión","⚠️ Bradicardia/BAV (5%) — tener marcapasos disponible","Inhibidor CYP2C9 y 2D6 — aumenta niveles de warfarina, digoxina","Vida media muy larga (40–55 días) — efectos persisten semanas","⚠️ En embarazo: Categoría D — riesgo hipotiroidismo fetal, EVITAR si hay alternativa"],
  fuente:"StatPearls 2024 · AHA ACLS 2020 · FDA PI Cordarone · AAFP 2023"},
  {id:"esmolol",nombre:"Esmolol",alias:"Brevibloc",grupo:"antiarritmico",emoji:"💛",presentacion:"Vial 2500 mg/250 mL (10 mg/mL, premix listo) · Alt: 100 mg/10 mL",dilucion:"Premix listo para uso · Si ampolla: 2500 mg en 250 mL SF = 10 mg/mL",diluyente:"SF o DAD5%",via:"Central o periférica gruesa",unidad:"mcg/kg/min",infusion:{inicio:"50",mantenimiento:"50–200",maximo:"300 mcg/kg/min"},bolo:{dosis:"500 mcg/kg en 1 min",indicacion:"Carga opcional — acelera onset"},
  notas:["β1 selectivo ultracorto — vida media 9 min · offset en 20–30 min","⭐ Ideal para control urgente de FC: FA con RVR, flutter, TSV perioperatoria (ACC/AHA AF 2023)","Protocolo: carga 500 mcg/kg/1min → 50 mcg/kg/min × 4min → aumentar si no hay respuesta","⭐ Útil en disección aórtica: meta FC <60 lpm","⚠️ Hipotensión frecuente — reversible en 30 min al suspender","⚠️ Bradicardia — suspender si FC <50 lpm","⚠️ CONTRAINDICADO: BAV 2°-3°, IC descompensada, bradicardia severa, hipotensión","Usar con precaución en asma/EPOC — mínima actividad β2","Metabolismo por esterasas eritrocitarias — no depende de hígado ni riñón","⚠️ En embarazo: Categoría C — datos limitados, usar con precaución"],
  fuente:"FDA PI Esmolol 2024 · StatPearls 2024 · ACC/AHA AF Guidelines 2023"},
  // ANTICOAGULANTES
  {id:"heparina",nombre:"Heparina Sódica",alias:"HNF / Heparina no fraccionada",grupo:"anticoagulante",emoji:"🩸",presentacion:"Vial 25.000 UI/5 mL (5.000 UI/mL) · Alt: 5.000 UI/1 mL",dilucion:"25.000 UI en 250 mL SF = 100 UI/mL · Alt: 25.000 UI en 500 mL SF = 50 UI/mL",diluyente:"SF o DAD5% · NO mezclar con otros fármacos",via:"Central o periférica (IV) · SC para profilaxis",unidad:"UI/kg/h",infusion:{inicio:"18",mantenimiento:"10–30 UI/kg/h ajustado por TTPA",maximo:"No definido — titular por TTPA"},bolo:{dosis:"80 UI/kg IV (TEV/TEP) · 60 UI/kg IV (SCA)",indicacion:"TEP · TVP · SCA · Inicio anticoagulación"},
  notas:["⭐ Protocolo peso: Bolo 80 UI/kg → infusión 18 UI/kg/h","Meta TTPA: 1.5–2.5 × valor control (60–100 seg según lab)","Controlar TTPA a las 4–6h del inicio y tras cada ajuste","⭐ TEP masivo: bolo 80–120 UI/kg + infusión 18 UI/kg/h","⭐ SCA: bolo 60 UI/kg (máx 4000 UI) + infusión 12 UI/kg/h","⚠️ TIH tipo II: plaquetas caen >50% entre días 5–21 — suspender INMEDIATAMENTE","⚠️ En TIH: iniciar anticoagulante alternativo (Argatrobán, Bivalirudina) — NO HBPM","Antídoto: Sulfato de Protamina 1 mg por cada 100 UI — máx 50 mg IV lento","⚠️ En embarazo: NO cruza placenta — SEGURA. Fármaco de elección para anticoagulación en embarazo","ECMO: bolo 100 UI/kg + infusión para mantener ACT 180–220 seg"],
  fuente:"CIMA Ficha Técnica Heparina · MSF Guidelines · EMCrit IBCC 2024"},
  // ESPECIALES
  {id:"azul_metileno",nombre:"Azul de Metileno",alias:"Methylene Blue",grupo:"especial",emoji:"⚡",presentacion:"Ampolla 50 mg/10 mL (5 mg/mL)",dilucion:"Bolo: diluir dosis en 100 mL SF · Infusión: concentración variable en SF",diluyente:"SF — NO DAD5%",via:"Central exclusivamente",unidad:"mg/kg",infusion:{inicio:"0.25",mantenimiento:"0.25–1 mg/kg/h",maximo:"7 mg/kg/día total"},bolo:{dosis:"1–2 mg/kg en 60 min",indicacion:"Shock vasopléjico refractario · Metahemoglobinemia"},
  notas:["Mecanismo: inhibidor de guanilato ciclasa y ON sintetasa → vasoconstricción","⭐ Shock vasopléjico refractario a catecolaminas (post-CEC, sepsis refractaria)","⭐ Metahemoglobinemia: 1–2 mg/kg en 5 min IV — antídoto específico","⚠️ CONTRAINDICADO en déficit G6PDH — hemólisis","⚠️ Interacción con serotonérgicos — síndrome serotoninérgico","⚠️ CONTRAINDICADO en embarazo — riesgo fetal","Tiñe orina, heces y piel de azul (informar al paciente/familia)","⚠️ Interfiere con pulsioximetría — SpO₂ falsamente baja durante infusión","Dosis máxima total: 7 mg/kg/día"],
  fuente:"Evora Ann Thorac Surg · UpToDate 2024"},
  {id:"terlipresina",nombre:"Terlipresina",alias:"Glypressin",grupo:"especial",emoji:"⚡",presentacion:"Ampolla 1 mg (polvo liofilizado)",dilucion:"Bolo: 1 mg en 5 mL SF · Infusión: 1 mg en 100 mL SF",diluyente:"SF",via:"Central",unidad:"mg/bolo o mcg/kg/h",infusion:{inicio:"1.3",mantenimiento:"1.3–2.6 mcg/kg/h",maximo:"No bien definido"},bolo:{dosis:"1–2 mg IV c/4–6h",indicacion:"Síndrome hepatorenal · Hemorragia variceal · Shock vasopléjico"},
  notas:["⭐ SHR tipo 1 (HRS-AKI): 1 mg c/4–6h + Albúmina 20–40g/día","⭐ Hemorragia variceal: 2 mg bolo luego 1 mg c/4–6h por 2–5 días","⚠️ Isquemia digital, mesentérica y coronaria — monitoreo estrecho","⚠️ Bradicardia e hipertensión frecuentes","CONFIRM Trial: beneficio en HRS-AKI con creatinina <5 mg/dL","⚠️ En embarazo: produce contracciones uterinas — EVITAR","Reducir en falla renal severa"],
  fuente:"CONFIRM Trial NEJM 2021 · AASLD 2022"},
  // TROMBOLÍTICOS
  {id:"alteplasa",nombre:"Alteplasa (tPA)",alias:"Activase / rtPA",grupo:"trombolítico",emoji:"🧬",presentacion:"Vial polvo 50 mg o 100 mg (reconstituir con agua estéril incluida)",dilucion:"Reconstituir con agua estéril → concentración 1 mg/mL · Luego diluir en SF si necesario",diluyente:"Agua estéril para reconstituir · SF para dilución posterior",via:"IV periférica o central — NO IM durante infusión",unidad:"mg/kg o mg fijos según indicación",infusion:{inicio:"Ver por indicación abajo",mantenimiento:"Ver régimen específico",maximo:"Máx 90 mg ACV · Máx 100 mg IAM y TEP"},bolo:{dosis:"Ver régimen específico por indicación",indicacion:"ACV isquémico · IAM/STEMI · TEP masivo"},
  esAlteplasa:true,
  notas:["⭐ ACV isquémico: 0.9 mg/kg (máx 90 mg) · 10% bolo en 1 min + 90% en 60 min · ventana ≤4.5h","⭐ IAM/STEMI: 15 mg bolo → 0.75 mg/kg/30 min (máx 50 mg) → 0.5 mg/kg/60 min (máx 35 mg)","⭐ TEP masivo: 100 mg en 2 h IV · Iniciar heparina al finalizar cuando TTPA <80 seg","⚠️ Usar dentro de 8h de reconstitución","⚠️ Controlar PA cada 15 min durante infusión en ACV","⚠️ En ACV: NO anticoagulantes ni antiagregantes en primeras 24h","⚠️ En embarazo: Categoría C — riesgo hemorragia uterina. Puede usarse en ACV o TEP masivo si beneficio > riesgo (AHA/ASA 2019)","⚠️ Suspender si: sangrado severo, angioedema, deterioro neurológico brusco","Tener Crioprecipitado disponible por si hay hemorragia grave"],
  fuente:"FDA PI Activase · StatPearls 2024 · AHA Stroke Guidelines 2019 · ACLS 2020"},
];

// ─── ALTEPLASE CHECKLIST DATA ─────────────────────────────────────────────────
const ALTEPLASE_CHECKLIST={
  acv:{
    label:"🧠 ACV Isquémico",
    ventana:"≤ 3h (hasta 4.5h con criterios ECASS-3)",
    dosis:"0.9 mg/kg IV (máx 90 mg)\n• 10% en bolo IV en 1 minuto\n• 90% restante en infusión en 60 minutos",
    absolutas:[
      "Hemorragia intracraneal en TAC actual",
      "Síntomas >4.5h de inicio o tiempo desconocido",
      "ACV isquémico o TEC grave en últimos 3 meses",
      "Cirugía intracraneal o espinal en últimos 3 meses",
      "PAS >185 mmHg o PAD >110 mmHg al momento (no controlada)",
      "Sangrado interno activo (excepto menstruación)",
      "Plaquetas <100.000/mm³",
      "Glucosa <50 mg/dL o >400 mg/dL",
      "Anticoagulante oral activo con INR >1.7 o TP >15 seg",
      "Heparina IV en últimas 48h con TTPA elevado",
      "DOAC activo (Rivaroxabán, Apixabán, Dabigatrán) en últimas 48h",
      "Endocarditis infecciosa activa",
      "Disección aórtica conocida o sospechada",
      "Neoplasia intracraneal, MAV o aneurisma conocido",
    ],
    relativas:[
      "Cirugía mayor o trauma en últimos 14 días",
      "Sangrado GI o urinario en últimos 21 días",
      "Parto o procedimiento obstétrico en últimos 10 días",
      "Punción arterial no compresible en últimos 7 días",
      "Coma severo o deterioro neurológico rápido",
      "Convulsión al inicio del ACV",
      "🤰 Embarazo — riesgo hemorragia uterina (puede usarse si beneficio > riesgo)",
      "Edad >80 años — mayor riesgo HIC",
      "NIHSS >25 — ACV muy grave, riesgo transformación hemorrágica",
      "NIHSS <4 — síntomas leves, balance riesgo/beneficio dudoso",
    ],
  },
  iam:{
    label:"❤️ IAM / STEMI",
    ventana:"≤ 12h de síntomas (ideal <3h) — cuando ACTP no disponible",
    dosis:"Régimen acelerado:\n• 15 mg bolo IV\n• 0.75 mg/kg en 30 min (máx 50 mg)\n• 0.5 mg/kg en 60 min (máx 35 mg)\nTotal máx 100 mg",
    absolutas:[
      "Sangrado interno activo",
      "ACV previo en los últimos 3 meses",
      "Cirugía intracraneal o espinal en los últimos 3 meses",
      "TEC grave en los últimos 3 meses",
      "Neoplasia intracraneal activa",
      "Disección aórtica sospechada o confirmada",
      "Malformación AV o aneurisma intracraneal conocido",
      "PAS >185 mmHg o PAD >110 mmHg (no controlada)",
      "Diátesis hemorrágica activa",
    ],
    relativas:[
      "HTA severa (PAS >180) que responde a tratamiento",
      "ACV isquémico hace >3 meses o demencia",
      "Cirugía mayor en últimas 3 semanas",
      "Sangrado GI o urinario en último mes",
      "Punción vascular no compresible reciente",
      "RCP traumática o prolongada",
      "🤰 Embarazo — riesgo hemorragia uterina",
      "Úlcera péptica activa",
      "Anticoagulación oral activa (INR >2–3)",
    ],
  },
  tep:{
    label:"🫁 TEP Masivo",
    ventana:"Shock hemodinámico o PCR por TEP — sin límite estricto de tiempo",
    dosis:"100 mg en 2 horas IV\n• Iniciar heparina cuando TTPA <80 seg al finalizar\n• En PCR: 50 mg bolo directo (off-label)",
    absolutas:[
      "Sangrado interno activo",
      "ACV en los últimos 3 meses",
      "Cirugía intracraneal o espinal en los últimos 3 meses",
      "TEC grave reciente",
      "Neoplasia intracraneal",
      "Disección aórtica",
    ],
    relativas:[
      "Cirugía mayor en últimas 3 semanas",
      "Sangrado GI en último mes",
      "ACV isquémico hace >3 meses",
      "Punción vascular no compresible reciente",
      "RCP traumática prolongada",
      "Plaquetas <100.000/mm³",
      "🤰 Embarazo — riesgo hemorragia uterina · usar si TEP masivo con riesgo vital",
      "HTA severa no controlada",
      "Anticoagulación terapéutica activa",
    ],
  },
};

// ─── ALTEPLASE CHECKLIST COMPONENT ────────────────────────────────────────────
function AlteplaseChecklist({peso}){
  const[indicacion,setIndicacion]=useState(null);
  const[marcadas,setMarcadas]=useState({});
  const p=parseFloat(peso)||null;

  function toggleItem(id){setMarcadas(m=>({...m,[id]:!m[id]}));}
  function reset(){setMarcadas({});setIndicacion(null);}

  if(!indicacion){
    return(<div>
      <div style={{fontSize:13,fontWeight:600,color:T.text,marginBottom:12}}>Seleccionar indicación para ver el checklist:</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {Object.entries(ALTEPLASE_CHECKLIST).map(([k,v])=>(
          <button key={k} onClick={()=>setIndicacion(k)} style={{padding:"14px 16px",borderRadius:12,border:`1.5px solid ${T.border}`,background:T.surface,cursor:"pointer",textAlign:"left",fontSize:14,fontWeight:600,color:T.text}}>
            {v.label} <span style={{fontSize:12,color:T.label,fontWeight:400,marginLeft:8}}>Ventana: {v.ventana}</span>
          </button>
        ))}
      </div>
    </div>);
  }

  const data=ALTEPLASE_CHECKLIST[indicacion];
  const nAbsolutas=data.absolutas.filter((_,i)=>marcadas[`abs_${i}`]).length;
  const nRelativas=data.relativas.filter((_,i)=>marcadas[`rel_${i}`]).length;
  const decision=nAbsolutas>0?"NO DAR":nRelativas>0?"EVALUAR RIESGO/BENEFICIO":"PUEDE DAR";
  const decisionColor=nAbsolutas>0?T.red:nRelativas>0?T.yellow:T.green;
  const decisionBg=nAbsolutas>0?"#FFF0EF":nRelativas>0?"#FFF8F0":"#F0FBF3";

  // Calcular dosis
  let dosisCalc=null;
  if(p&&indicacion==="acv"){
    const total=Math.min(p*0.9,90);
    const bolo=(total*0.1).toFixed(1);
    const inf=(total*0.9).toFixed(1);
    dosisCalc=`Total: ${total.toFixed(1)} mg · Bolo: ${bolo} mg en 1 min · Infusión: ${inf} mg en 60 min`;
  }

  return(<div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
      <div style={{fontSize:14,fontWeight:700,color:ACCENT}}>{data.label}</div>
      <button onClick={reset} style={{fontSize:12,color:T.label,background:"transparent",border:"none",cursor:"pointer",textDecoration:"underline"}}>← Cambiar indicación</button>
    </div>

    {/* Ventana y dosis */}
    <div style={{padding:"12px 14px",background:ACCENT_LIGHT,borderRadius:12,marginBottom:12}}>
      <div style={{fontSize:11,fontWeight:700,color:ACCENT_MID,marginBottom:4,textTransform:"uppercase"}}>⏱ Ventana</div>
      <div style={{fontSize:13,color:ACCENT_MID,fontWeight:600}}>{data.ventana}</div>
    </div>
    <div style={{padding:"12px 14px",background:T.surface2,borderRadius:12,marginBottom:12}}>
      <div style={{fontSize:11,fontWeight:700,color:T.label,marginBottom:4,textTransform:"uppercase"}}>💉 Dosis</div>
      <div style={{fontSize:12,color:T.text,whiteSpace:"pre-line",lineHeight:1.6}}>{data.dosis}</div>
      {dosisCalc&&<div style={{marginTop:8,padding:"8px 12px",background:ACCENT,borderRadius:8,textAlign:"center"}}><div style={{fontSize:11,color:"#BAE6FD",fontWeight:600,marginBottom:2}}>CALCULADO PARA {p} KG</div><div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{dosisCalc}</div></div>}
    </div>

    {/* Resultado */}
    <div style={{padding:"14px 16px",background:decisionBg,borderRadius:12,marginBottom:12,border:`2px solid ${decisionColor}40`,textAlign:"center"}}>
      <div style={{fontSize:11,fontWeight:600,color:T.label,marginBottom:4}}>RESULTADO DEL CHECKLIST</div>
      <div style={{fontSize:20,fontWeight:800,color:decisionColor}}>{decision}</div>
      {nAbsolutas>0&&<div style={{fontSize:12,color:T.red,marginTop:4}}>{nAbsolutas} contraindicación(es) absoluta(s) marcada(s)</div>}
      {nRelativas>0&&nAbsolutas===0&&<div style={{fontSize:12,color:T.yellow,marginTop:4}}>{nRelativas} contraindicación(es) relativa(s) — evaluar caso a caso</div>}
    </div>

    {/* Contraindicaciones absolutas */}
    <div style={{marginBottom:10}}>
      <div style={{fontSize:12,fontWeight:700,color:T.red,marginBottom:6,display:"flex",alignItems:"center",gap:6}}>🚫 CONTRAINDICACIONES ABSOLUTAS — ¿el paciente tiene alguna?</div>
      {data.absolutas.map((item,i)=>(
        <div key={i} onClick={()=>toggleItem(`abs_${i}`)} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 12px",borderRadius:10,marginBottom:4,cursor:"pointer",background:marcadas[`abs_${i}`]?"#FFF0EF":T.surface,border:`1px solid ${marcadas[`abs_${i}`]?"#FF3B3060":T.border}`,transition:"all 0.15s"}}>
          <div style={{width:20,height:20,borderRadius:5,border:`2px solid ${marcadas[`abs_${i}`]?T.red:T.border}`,background:marcadas[`abs_${i}`]?T.red:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
            {marcadas[`abs_${i}`]&&<span style={{color:"#fff",fontSize:12}}>✓</span>}
          </div>
          <div style={{fontSize:12,color:marcadas[`abs_${i}`]?T.red:T.text,lineHeight:1.4,fontWeight:marcadas[`abs_${i}`]?600:400}}>{item}</div>
        </div>
      ))}
    </div>

    {/* Contraindicaciones relativas */}
    <div>
      <div style={{fontSize:12,fontWeight:700,color:T.yellow,marginBottom:6}}>⚠️ CONTRAINDICACIONES RELATIVAS — evaluar riesgo/beneficio</div>
      {data.relativas.map((item,i)=>(
        <div key={i} onClick={()=>toggleItem(`rel_${i}`)} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 12px",borderRadius:10,marginBottom:4,cursor:"pointer",background:marcadas[`rel_${i}`]?"#FFF8F0":T.surface,border:`1px solid ${marcadas[`rel_${i}`]?"#FF950060":T.border}`,transition:"all 0.15s"}}>
          <div style={{width:20,height:20,borderRadius:5,border:`2px solid ${marcadas[`rel_${i}`]?T.yellow:T.border}`,background:marcadas[`rel_${i}`]?T.yellow:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
            {marcadas[`rel_${i}`]&&<span style={{color:"#fff",fontSize:12}}>✓</span>}
          </div>
          <div style={{fontSize:12,color:marcadas[`rel_${i}`]?"#CC7A00":T.text,lineHeight:1.4,fontWeight:marcadas[`rel_${i}`]?600:400}}>{item}</div>
        </div>
      ))}
    </div>

    <button onClick={()=>setMarcadas({})} style={{marginTop:12,width:"100%",padding:"10px",borderRadius:10,border:`1px solid ${T.border}`,background:T.surface2,cursor:"pointer",fontSize:12,color:T.label}}>🔄 Limpiar checklist</button>
  </div>);
}

// ─── FARMACOS TAB ─────────────────────────────────────────────────────────────
const GRUPOS=[
  {id:"todos",label:"Todos",emoji:"💊"},{id:"vasopresor",label:"Vasopresores",emoji:"🔴"},
  {id:"inotrópico",label:"Inotrópicos",emoji:"🟠"},{id:"sedante",label:"Sedantes",emoji:"🟡"},
  {id:"analgésico",label:"Analgésicos",emoji:"🟢"},{id:"relajante",label:"Relajantes",emoji:"🔵"},
  {id:"antihipertensivo",label:"Antihipertensivos",emoji:"🟣"},{id:"antiarritmico",label:"Antiarrítmicos",emoji:"💛"},
  {id:"anticoagulante",label:"Anticoagulantes",emoji:"🩸"},{id:"trombolítico",label:"Trombolíticos",emoji:"🧬"},
  {id:"especial",label:"Especiales",emoji:"⚡"},
];

function FarmacosTab({state,setState}){
  const[grupo,setGrupo]=useState("todos");
  const[selected,setSelected]=useState(null);
  const[peso,setPeso]=useState(state.peso||"");
  const[showChecklist,setShowChecklist]=useState(false);
  const set=k=>val=>setState(d=>({...d,[k]:val}));
  const p=parseFloat(peso)||null;
  const filtrados=grupo==="todos"?FARMACOS:FARMACOS.filter(f=>f.grupo===grupo);
  const farmaco=FARMACOS.find(f=>f.id===selected);

  function calcBolo(dosis){
    if(!p||!dosis)return null;
    const match=dosis.match(/([\d.]+)(?:–([\d.]+))?\s*(mg|mcg)\/kg/i);
    if(!match)return null;
    const lo=parseFloat(match[1])*p;
    const hi=match[2]?parseFloat(match[2])*p:null;
    const u=match[3];
    if(hi)return`${lo.toFixed(1)}–${hi.toFixed(1)} ${u}`;
    return`${lo.toFixed(1)} ${u}`;
  }

  return(<div>
    {/* Peso */}
    <div style={{background:"#fff",borderRadius:16,padding:16,marginBottom:14,boxShadow:"0 1px 3px rgba(0,0,0,0.07)"}}>
      <div style={{fontSize:11,fontWeight:600,color:T.label,letterSpacing:"0.04em",textTransform:"uppercase",marginBottom:8}}>Peso del paciente (para cálculo de bolos)</div>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{flex:1,display:"flex",alignItems:"center",background:T.surface2,border:"1.5px solid #E5E5EA",borderRadius:10,padding:"10px 14px"}}>
          <input type="number" value={peso} onChange={e=>{setPeso(e.target.value);set("peso")(e.target.value);}} placeholder="ej: 70" style={{background:"transparent",color:T.text,fontSize:18,fontWeight:700,width:"100%",outline:"none",border:"none"}}/>
          <span style={{fontSize:14,color:T.label,marginLeft:4}}>kg</span>
        </div>
        {p&&<div style={{fontSize:13,color:ACCENT,fontWeight:600,whiteSpace:"nowrap"}}>✓ {p} kg</div>}
      </div>
    </div>

    {/* Filtro grupos */}
    <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:8,marginBottom:14}}>
      {GRUPOS.map(g=>(
        <button key={g.id} onClick={()=>{setGrupo(g.id);setSelected(null);setShowChecklist(false);}} style={{display:"flex",alignItems:"center",gap:5,padding:"7px 14px",borderRadius:20,border:"1.5px solid",cursor:"pointer",whiteSpace:"nowrap",fontSize:12,fontWeight:600,background:grupo===g.id?ACCENT:"#fff",borderColor:grupo===g.id?ACCENT:T.border,color:grupo===g.id?"#fff":"#3C3C43"}}>
          <span>{g.emoji}</span><span>{g.label}</span>
        </button>
      ))}
    </div>

    {/* Lista */}
    {!farmaco&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:10}}>
      {filtrados.map(f=>(
        <button key={f.id} onClick={()=>{setSelected(f.id);setShowChecklist(false);}} style={{background:"#fff",borderRadius:14,padding:"14px 12px",textAlign:"left",border:"1.5px solid #E5E5EA",cursor:"pointer",boxShadow:"0 1px 3px rgba(0,0,0,0.06)"}}>
          <div style={{fontSize:22,marginBottom:6}}>{f.emoji}</div>
          <div style={{fontSize:14,fontWeight:700,color:T.text,marginBottom:3}}>{f.nombre}</div>
          <div style={{fontSize:11,color:T.label,marginBottom:8}}>{f.alias}</div>
          <div style={{fontSize:11,color:ACCENT,fontWeight:600,background:ACCENT_LIGHT,borderRadius:6,padding:"2px 8px",display:"inline-block"}}>
            {f.infusion?`${f.infusion.inicio} ${f.unidad.split(" ")[0]}`:f.bolo?"Solo bolo":"—"}
          </div>
        </button>
      ))}
    </div>}

    {/* Ficha fármaco */}
    {farmaco&&<div>
      <button onClick={()=>{setSelected(null);setShowChecklist(false);}} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",border:"none",background:"transparent",cursor:"pointer",color:ACCENT,fontSize:14,fontWeight:600,marginBottom:12}}>← Volver</button>
      <div style={{background:"#fff",borderRadius:16,overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,0.07)"}}>
        {/* Header */}
        <div style={{background:ACCENT,padding:"18px 16px"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:32}}>{farmaco.emoji}</span>
            <div><div style={{fontSize:20,fontWeight:800,color:"#fff"}}>{farmaco.nombre}</div><div style={{fontSize:13,color:"#BAE6FD",marginTop:2}}>{farmaco.alias}</div></div>
          </div>
        </div>
        <div style={{padding:16}}>
          {/* Si es Alteplasa — mostrar checklist */}
          {farmaco.esAlteplasa&&<div style={{marginBottom:16}}>
            <button onClick={()=>setShowChecklist(s=>!s)} style={{width:"100%",padding:"12px",borderRadius:12,border:`2px solid ${T.red}`,background:showChecklist?"#FFF0EF":"#fff",cursor:"pointer",fontSize:14,fontWeight:700,color:T.red}}>
              {showChecklist?"📋 Ocultar Checklist":"📋 ABRIR CHECKLIST DE CONTRAINDICACIONES"}
            </button>
            {showChecklist&&<div style={{marginTop:12,padding:14,background:T.surface2,borderRadius:12}}><AlteplaseChecklist peso={peso}/></div>}
          </div>}

          {/* Presentación */}
          <FSect title="💊 Presentación"><InfoRow label="Ampolla/Frasco" value={farmaco.presentacion}/></FSect>

          {/* Dilución */}
          <FSect title="🧪 Dilución">
            {farmaco.dilucion.split("\n").map((line,i)=><div key={i} style={{fontSize:13,color:T.text,marginBottom:4,fontWeight:i===0?600:400}}>{line}</div>)}
            <div style={{marginTop:6,padding:"6px 10px",background:ACCENT_LIGHT,borderRadius:8,fontSize:12,color:ACCENT_MID}}>Diluyente: {farmaco.diluyente}</div>
            <InfoRow label="Vía" value={farmaco.via}/>
          </FSect>

          {/* Infusión */}
          {farmaco.infusion&&<FSect title="📈 Infusión continua">
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              <MetB label="Inicio" value={farmaco.infusion.inicio} unit={farmaco.unidad} color={T.green}/>
              <MetB label="Mantenimiento" value={farmaco.infusion.mantenimiento} unit={farmaco.unidad} color={T.yellow}/>
              <MetB label="Máximo" value={`${farmaco.infusion.maximo}`} unit="" color={T.red}/>
            </div>
          </FSect>}

          {/* Bolo */}
          {farmaco.bolo&&<FSect title="💉 Bolo / Dosis única">
            <div style={{padding:"12px 14px",background:T.surface2,borderRadius:12}}>
              <div style={{fontSize:15,fontWeight:700,color:T.text,marginBottom:4}}>{farmaco.bolo.dosis}</div>
              <div style={{fontSize:12,color:T.label}}>{farmaco.bolo.indicacion}</div>
              {p&&(()=>{
                const calc=calcBolo(farmaco.bolo.dosis);
                return calc?<div style={{marginTop:10,padding:"10px 12px",background:ACCENT,borderRadius:10,textAlign:"center"}}><div style={{fontSize:11,color:"#BAE6FD",fontWeight:600,marginBottom:2}}>PARA {p} KG</div><div style={{fontSize:20,fontWeight:800,color:"#fff"}}>{calc}</div></div>:null;
              })()}
            </div>
          </FSect>}

          {/* Notas clínicas */}
          <FSect title="⚠️ Notas clínicas">
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              {farmaco.notas.map((nota,i)=>{
                const isWarn=nota.startsWith("⚠️")||nota.includes("CONTRAINDICADO")||nota.includes("EVITAR");
                const isStar=nota.startsWith("⭐");
                const isPreg=nota.includes("embarazo")||nota.includes("🤰")||nota.includes("Embarazo");
                return(<div key={i} style={{padding:"8px 12px",borderRadius:10,fontSize:12,lineHeight:1.5,background:isPreg?"#FFF0F5":isWarn?"#FFF0EF":isStar?"#F0FBF3":"#F2F2F7",color:isPreg?"#C4004D":isWarn?"#CC2F26":isStar?"#1A8C3A":"#3C3C43",borderLeft:`3px solid ${isPreg?"#FF3B70":isWarn?"#FF3B30":isStar?"#34C759":"#E5E5EA"}`}}>{nota}</div>);
              })}
            </div>
          </FSect>

          <div style={{marginTop:8,fontSize:10,color:T.label,textAlign:"right"}}>📚 {farmaco.fuente}</div>
        </div>
      </div>
    </div>}
  </div>);
}

function FSect({title,children}){
  return(<div style={{marginBottom:16}}>
    <div style={{fontSize:12,fontWeight:700,color:ACCENT,letterSpacing:"0.04em",textTransform:"uppercase",marginBottom:8,paddingBottom:6,borderBottom:`1px solid ${T.border}`}}>{title}</div>
    {children}
  </div>);
}
function InfoRow({label,value}){
  return(<div style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${T.surface2}`}}>
    <span style={{fontSize:12,color:T.label,fontWeight:600}}>{label}</span>
    <span style={{fontSize:12,color:T.text,textAlign:"right",maxWidth:"65%",lineHeight:1.4}}>{value}</span>
  </div>);
}
function MetB({label,value,unit,color}){
  return(<div style={{background:T.surface2,borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
    <div style={{fontSize:10,color:T.label,fontWeight:600,textTransform:"uppercase",marginBottom:4}}>{label}</div>
    <div style={{fontSize:13,fontWeight:700,color,lineHeight:1.2}}>{value}</div>
    {unit&&<div style={{fontSize:9,color:T.label,marginTop:2}}>{unit}</div>}
  </div>);
}

// ─── APP ──────────────────────────────────────────────────────────────────────
const TABS=[
  {id:"hemo",icon:"🫀",label:"Hemodinamia"},
  {id:"vent",icon:"🫁",label:"Ventilación"},
  {id:"vexus",icon:"🩸",label:"VExUS"},
  {id:"neuro",icon:"🧠",label:"Neurología"},
  {id:"farmacos",icon:"💊",label:"Fármacos"},
];
const INIT={
  hemo:{fc:"",pas:"",pad:"",spo2:"",fio2_basic:"21",altura:"",peso:"",pao2:"",paco2:"",hco3a:"",sao2:"",pvco2:"",pvo2:"",svo2:"",hb:"",pvc:"",lactato1:"",lactato2:"",gc_directo:"",dtsvi:"",vti:"",epss:"",fevi_simpson:"",fac_dd:"",fac_ds:"",cfa_fd:"",cfa_fs:"",mapse:"",tapse:"",rvlv:"",vci_max:"",vci_min:"",vci_modo:"espontaneo"},
  vent:{sexo:"M",altura:"",vt:"",fr:"",peep:"",fio2:"",ppico:"",pplat:"",pao2:"",spo2:"",nif:"",p01:"",excursion_diaf:"",grosor_diaf:""},
  vexus:{vci_d:"",vci_col:"",portal_ip:"",renal_patron:"normal",hepatica:"normal"},
  neuro:{vps:"",vfd:"",vm:"",vm_aci:"",pam:"",dlm_a:"",dlm_b:""},
  farmacos:{peso:""},
};

export default function App(){
  const[tab,setTab]=useState("hemo");
  const[printMode,setPrintMode]=useState(false);
  const[states,setStates]=useState(INIT);
  const[pac,setPac]=useState({nombre:"",hc:"",cama:"",fecha:new Date().toISOString().split("T")[0]});
  const setP=k=>val=>setPac(d=>({...d,[k]:val}));
  const setTabState=tabId=>updater=>setStates(s=>({...s,[tabId]:typeof updater==="function"?updater(s[tabId]):updater}));

  return(<div style={{minHeight:"100vh",background:T.bg,color:T.text,fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Text','Segoe UI',sans-serif"}}>
    <style>{`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield}select{appearance:none;-webkit-appearance:none}@media print{button{display:none!important}.no-print{display:none!important}body{background:white!important}}`}</style>

    {/* HEADER */}
    <div style={{background:"rgba(242,242,247,0.97)",borderBottom:`1px solid ${T.border}`,position:"sticky",top:0,zIndex:20,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"10px clamp(12px,3vw,24px)"}}>
        {/* Top row */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:10}}>
          <div><div style={{fontSize:24,fontWeight:800,letterSpacing:"-0.5px",color:T.text,lineHeight:1}}>UCI<span style={{color:ACCENT}}>calc</span></div><div style={{fontSize:11,color:T.label,marginTop:2}}>Medicina Crítica</div></div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            {printMode&&<div style={{fontSize:11,color:T.label,textAlign:"right"}}><div style={{fontWeight:600,color:T.text}}>{new Date().toLocaleDateString("es-EC",{day:"2-digit",month:"2-digit",year:"numeric"})}</div><div>{new Date().toLocaleTimeString("es-EC",{hour:"2-digit",minute:"2-digit"})}</div></div>}
            <button onClick={()=>{setPrintMode(true);setTimeout(()=>{window.print();setPrintMode(false);},300)}} style={{background:ACCENT,color:"white",border:"none",borderRadius:10,padding:"8px 16px",fontSize:13,fontWeight:600,cursor:"pointer"}}>🖨 PDF</button>
          </div>
        </div>

        {/* Paciente — responsive */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:6,marginBottom:10}}>
          {[["nombre","Nombre del paciente"],["hc","HC / Expediente"],["cama","Cama"]].map(([k,ph])=>(
            <input key={k} value={pac[k]} onChange={e=>setP(k)(e.target.value)} placeholder={ph} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"7px 10px",fontSize:13,color:T.text,outline:"none"}}/>
          ))}
          <input type="date" value={pac.fecha} onChange={e=>setP("fecha")(e.target.value)} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"7px 10px",fontSize:13,color:T.label,outline:"none"}}/>
        </div>

        {/* Tabs — scroll horizontal en móvil */}
        <div className={printMode?"no-print":""} style={{display:"flex",borderBottom:`1px solid ${T.border}`,overflowX:"auto",gap:0}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{display:"flex",alignItems:"center",gap:6,padding:"9px clamp(10px,2vw,20px)",fontSize:clamp(11,13),fontWeight:600,border:"none",cursor:"pointer",background:"transparent",color:tab===t.id?ACCENT:T.label,borderBottom:tab===t.id?`2px solid ${ACCENT}`:"2px solid transparent",transition:"all 0.15s",whiteSpace:"nowrap"}}>
              <span style={{fontSize:15}}>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* CONTENT */}
    <div style={{maxWidth:1280,margin:"0 auto",padding:"16px clamp(12px,3vw,24px) 60px"}}>
      {tab==="hemo"&&<HemoTab state={states.hemo} setState={setTabState("hemo")} printMode={printMode}/>}
      {tab==="vent"&&<VentTab state={states.vent} setState={setTabState("vent")} printMode={printMode}/>}
      {tab==="vexus"&&<VexusTab state={states.vexus} setState={setTabState("vexus")}/>}
      {tab==="neuro"&&<NeuroTab state={states.neuro} setState={setTabState("neuro")} printMode={printMode}/>}
      {tab==="farmacos"&&<FarmacosTab state={states.farmacos} setState={setTabState("farmacos")}/>}
    </div>

    <div style={{textAlign:"center",fontSize:11,color:T.label,padding:"0 24px 24px",lineHeight:1.6}}>
      Soporte clínico únicamente · No reemplaza el juicio médico · AHA 2025 · SSC 2021 · ESICM 2025
    </div>
  </div>);
}

function clamp(min,max){return`clamp(${min}px,2vw,${max}px)`;}
