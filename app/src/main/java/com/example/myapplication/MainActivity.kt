package com.example.myapplication

import android.content.Context
import android.content.PeriodicSync
import android.os.Bundle
import android.util.Log
import com.google.android.material.bottomnavigation.BottomNavigationView
import androidx.appcompat.app.AppCompatActivity
import android.widget.TextView
import com.example.myapplication.MyApp.FLAG1566
import com.google.gson.Gson
import java.util.prefs.PreferenceChangeEvent

class MainActivity : AppCompatActivity() {


    private lateinit var textMessage: TextView
    private val onNavigationItemSelectedListener = BottomNavigationView.OnNavigationItemSelectedListener { item ->
        when (item.itemId) {
            R.id.navigation_home -> {
//                textMessage.setText(R.string.title_home)
                textMessage.setText(FLAG1566)
                return@OnNavigationItemSelectedListener true
            }
            R.id.navigation_dashboard -> {
                textMessage.setText(R.string.title_dashboard)
                return@OnNavigationItemSelectedListener true
            }
            R.id.navigation_notifications -> {
                textMessage.setText(R.string.title_notifications)
                return@OnNavigationItemSelectedListener true
            }
        }
        false
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val navView: BottomNavigationView = findViewById(R.id.nav_view)

        textMessage = findViewById(R.id.message)
        navView.setOnNavigationItemSelectedListener(onNavigationItemSelectedListener)


        val preferences = baseContext.getSharedPreferences(MyApp.SP_NAME, Context.MODE_PRIVATE)

        Log.i("phoneNumber0", preferences.toString())
        for (n in preferences.all) {
            Log.i("phoneNumber", Gson().toJson(n.value))
        }

    }
}
